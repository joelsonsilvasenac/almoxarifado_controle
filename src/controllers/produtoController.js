const produtoRepository = require('../repositories/produtoRepository');

/**
 * GRUPO 2: CONTROLADOR DE PRODUTOS
 */
const criarProduto = async (req, res) => {
    // TODO: Validar e cadastrar produto com nome, descricao, quantidade_estoque e data_validade
    res.status(501).json({ mensagem: 'produtoController.criarProduto ainda não implementado.' });
};

const listarProdutos = async (req, res) => {
    // TODO: Listar produtos do estoque
    res.status(501).json({ mensagem: 'produtoController.listarProdutos ainda não implementado.' });
};

const atualizarProduto = async (req, res) => {
    // TODO: Atualizar dados do produto
    res.status(501).json({ mensagem: 'produtoController.atualizarProduto ainda não implementado.' });
};



module.exports = { criarProduto, listarProdutos, atualizarProduto };