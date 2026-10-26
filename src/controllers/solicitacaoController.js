const solicitacaoRepository = require('../repositories/solicitacaoRepository');
const produtoRepository = require('../repositories/produtoRepository');

/**
 * GRUPO 3: CONTROLADOR DE SOLICITAÇÕES
 */
const criarSolicitacao = async (req, res) => {
    
    try{

        const usuario_id = req.usuario_id;
        const { produto_id, quantidade_solicitada } = req.body;
        const produto = await produtoRepository.buscarPorId(produto_id);

        if (!produto) {
            return res.status(404).json({ mensagem: 'POV: EU -MÂE... Produto não encontrado. MINHA MÃE - SE EU FOR AÍ E ENCONTRAR, EU ESFREGO NA SUA CARA!' });
        }

        if(produto.data_validade < new Date()) {
            return res.status(400).json({ mensagem: 'POV: EU -MÂE... o Produto tá Vencido. MINHA MÃE - VOCÊS SÃO ESTRAGADOS MESMO, VAI JOGAR FORA NÃO, VAI COMER ASSIM MESMO!' });
        }

        if(quantidade_solicitada > produto.quantidade_estoque) {
            return res.status(400).json({ mensagem: 'POV: EU -MÂE... acabou o Estoque. MINHA MÃE - EU NÃO ESTOU CRIANDO GENTE NÃO, TO CRIANDO E UNS CACHORRO!' });
        }

        const solicitacao = await solicitacaoRepository.criar({
            usuario_id,
            produto_id,
            quantidade_solicitada,
            data_solicitacao: new Date()
        });

        await produtoRepository.atualizarEstoque(produto_id, produto.quantidade_estoque - quantidade_solicitada);

        res.status(201).json(solicitacao);

    } catch (erro) {
        res.status(501).json({ mensagem: 'solicitacaoController.criarSolicitacao ainda não implementado.' });
        
    }
};

const minhasSolicitacoes = async (req, res) => {

  try {        
        const usuario_id  = req.usuatio_id;
        const solicitacoes = await solicitacaoRepository.buscarPorUsuarioId(usuario_id);

        return res.status(200).json(solicitacoes);
        
    } catch (erro) {
        // TODO: Listar solicitações de req.usuario_id
        console.log(erro);
       res.status(501).json({ mensagem: 'solicitacaoController.minhasSolicitacoes ainda não implementado.' });
    }   
       
};

const listarTodas = async (req, res) => {
    // TODO: Listar todas as solicitações (relatório admin/SuperAdmin)
    try{
        const solicitacoes = await solicitacaoRepository.listarTodas();
        return res.status(200).json(solicitacoes);

    } catch (erro) {
        console.log(erro);
        res.status(501).json({ mensagem: 'solicitacaoController.listarTodas ainda não implementado.' });
    }
};

module.exports = { criarSolicitacao, minhasSolicitacoes, listarTodas };