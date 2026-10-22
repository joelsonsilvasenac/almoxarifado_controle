const pool = require('../config/db');

/**
 * GRUPO 3: SOLICITAÇÕES
 */

// Registra a solicitação de retirada de produto
const criar = async (usuario_id, produto_id, quantidade) => {
    // TODO: Implementar SQL INSERT INTO solicitacoes (usuario_id, produto_id, quantidade) VALUES ($1, $2, $3) RETURNING *
    throw new Error('solicitacaoRepository.criar() ainda não implementado.');
};

// Lista solicitações do usuário logado
const listarPorUsuario = async (usuario_id) => {
    // TODO: Implementar SQL JOIN entre solicitacoes e produtos filtrando por usuario_id
    throw new Error('solicitacaoRepository.listarPorUsuario() ainda não implementado.');
};

// Lista todas as solicitações (Relatório para admin e SuperAdmin)
const listarTodas = async () => {
    // TODO: Implementar SQL JOIN entre solicitacoes, usuarios e produtos
    throw new Error('solicitacaoRepository.listarTodas() ainda não implementado.');
};

module.exports = { criar, listarPorUsuario, listarTodas };