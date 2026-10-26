const solicitacaoRepository = require('../repositories/solicitacaoRepository');
const produtoRepository = require('../repositories/produtoRepository');

/**
 * GRUPO 3: CONTROLADOR DE SOLICITAÇÕES
 */
const criarSolicitacao = async (req, res) => {
    // TODO:
    // 1. Extrair usuario_id de req.usuario_id (JWT)
    // 2. Buscar o produto por produto_id (produtoRepository.buscarPorId)
    // 3. Validação de Validade: Se data_validade < data atual -> 400 Bad Request ("Produto Vencido")
    // 4. Validação de Estoque: Se quantidade_solicitada > quantidade_estoque -> 400 Bad Request ("Estoque Insuficiente")
    // 5. Registrar a solicitação (solicitacaoRepository.criar)
    // 6. Dar baixa no estoque (produtoRepository.atualizarEstoque)
    res.status(501).json({ mensagem: 'solicitacaoController.criarSolicitacao ainda não implementado.' });
};

const minhasSolicitacoes = async (req, res) => {
    // TODO: Listar solicitações de req.usuario_id
    res.status(501).json({ mensagem: 'solicitacaoController.minhasSolicitacoes ainda não implementado.' });
};

const listarTodas = async (req, res) => {
    // TODO: Listar todas as solicitações (relatório admin/SuperAdmin)
    res.status(501).json({ mensagem: 'solicitacaoController.listarTodas ainda não implementado.' });
};

module.exports = { criarSolicitacao, minhasSolicitacoes, listarTodas };