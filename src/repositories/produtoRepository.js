const pool = require('../config/db');

/**
 * GRUPO 2: PRODUTOS
 */

// Cadastra um novo produto com data de validade
const criar = async (nome, descricao, quantidade_estoque, data_validade) => {
    // TODO: Implementar SQL INSERT INTO produtos (nome, descricao, quantidade_estoque, data_validade) ... RETURNING *
    throw new Error('produtoRepository.criar() ainda não implementado.');
};

// Lista todos os produtos
const listarTodos = async () => {
    // TODO: Implementar SQL SELECT * FROM produtos ORDER BY nome
    throw new Error('produtoRepository.listarTodos() ainda não implementado.');
};

// Busca produto por ID (Usado na validação de validade e estoque pelo Grupo 3)
const buscarPorId = async (id) => {
    // TODO: Implementar SQL SELECT * FROM produtos WHERE id = $1
    throw new Error('produtoRepository.buscarPorId() ainda não implementado.');
};

// Atualiza a quantidade do estoque após a baixa/retirada
const atualizarEstoque = async (id, novaQuantidade) => {
    // TODO: Implementar SQL UPDATE produtos SET quantidade_estoque = $1 WHERE id = $2 RETURNING *
    throw new Error('produtoRepository.atualizarEstoque() ainda não implementado.');
};

module.exports = { criar, listarTodos, buscarPorId, atualizarEstoque };