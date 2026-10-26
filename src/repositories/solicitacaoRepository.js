const pool = require('../config/db');

/**
 * GRUPO 3: SOLICITAÇÕES
 */

// Registra a solicitação de retirada de produto
const criar = async (usuario_id, produto_id, quantidade) => {
    const sql = 'INSERT INTO solicitacoes (usuario_id, produto_id, quantidade) VALUES ($1, $2, $3) RETURNING *';
    const resultado = await pool.query(sql, [usuario_id, produto_id, quantidade]);
    return resultado.rows[0];
};

// Lista solicitações do usuário logado
const listarPorUsuario = async (usuario_id) => {
    const sql = `SELECT * FROM solicitacoes WHERE usuario_id = $1;`
    const resultado = await pool.query(sql, [usuario_id]);
    return resultado.rows[0];
};

// Lista todas as solicitações (Relatório para admin e SuperAdmin)
const listarTodas = async () => {
    const sql = `SELECT * FROM solicitacoes;`
    const resultado = await pool.query(sql);
    return resultado.rows[0];
};

module.exports = { criar, listarPorUsuario, listarTodas };