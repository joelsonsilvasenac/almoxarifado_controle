const produtoRepository = require('../repositories/produtoRepository');

/**
 * GRUPO 2: CONTROLADOR DE PRODUTOS
 */
const criarProduto = async (req, res) => {
    try{
        const {nome,descricao,quantidade_estoque,data_validade} = req.body;
        //validação de campos obrigatórios
        if (!nome || quantidade_estoque === undefined || !data_validade) {
            return res.status(400).json({
                mensagem:'Os campos nome, quantidade_estoque e data_validade são obrigatoórios mocinho huumf'
            });
        }
        //validção de regra: estoque não pode estár negativo/devendo!!!!
        if (quantidade_estoque <0){
            return res.status(400).json({
                mensagem: 'O Valor não pode ser negativo, vai dever pro seu banco'
            })
        }
        const produtoCriado = await produtoRepository.criar(
            nome,
            descricao || null,
            quantidade_estoque,
            data_validade
        );
        return res.status(201).json(produtoCriado);
    } catch (error){
        console.error('Erro ao criar produto:',error);
        return res.status(500).json({mensagem:'Erro interno no servidor.'})
    }
};

const listarProdutos = async (req, res) => {
    try{
        const produtos = await produtoRepository.listarTodos();
        return res.status(200).json(produtos);
    }catch (error) {
        console.error(error.message);
        return res.status(500).json({
            mensagem:"Erro interno"
        });
    };
};

const listarProdutosPorID = async (req, res) => {
    try{
        const id = req.params.id;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensagem: "Insira um id valido"
            });
        };

        const produtos = await produtoRepository.buscarPorId(id);

        if (!produtos) {
            res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        };

        return res.status(200).json(produtos)
    }catch (error) {
        console.error(error.message);
        return res.status(500).json({
            mensagem:"Erro interno"
        });
    };
}

const atualizarProduto = async (req, res) => {
    try{
        const id = req.params.id;
    
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensagem:"Insira um id valido"
            });
        };
    
        const {nome, descricao, quantidade_estoque, data_validade} = req.body;
    
        if (!nome || !descricao || isNaN(quantidade_estoque) || !data_validade) {
            return res.status(400).json({
                mensagem:"Todos os campos devem ser preenchidos"
            });
        };
    
        const produto = await produtoRepository.atualizar(id, nome, descricao, quantidade_estoque, data_validade);
    
        if (produto.rowCount === 0) {
            return res.status(404).json({
                mensagem:"Produto não encontrado"
            });
        };
    
        return res.status(200).json({
            mensagem:"Produto atualizado",
            produto:produto
        })

    }catch (error) {
        console.error(error.message);
        return res.status(500).json({
            mensagem:"Erro interno"
        });
    };
};

// A FK solicitacoes.produto_id impede excluir itens vinculados (PG 23503).
const deletarProduto = async (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id) || Number(id) < 1) {
        return res.status(400).json({ mensagem: 'ID do produto inválido.' });
    }
    try {
        const produto = await produtoRepository.deletar(id);
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.', produto });
    } catch (erro) {
        if (erro.code === '23503') {
            return res.status(409).json({ mensagem: 'Produto possui solicitações vinculadas e não pode ser excluído.' });
        }
        console.error('Erro ao excluir produto:', erro);
        return res.status(500).json({ mensagem: 'Erro interno ao excluir produto.' });
    }
};

// Exportações nomeadas evitam sobrescrever handlers adicionados pelos colegas.
module.exports = { criarProduto, listarProdutos, atualizarProduto, deletarProduto, listarProdutosPorID };
