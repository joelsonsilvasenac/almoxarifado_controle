const pool = require('../config/db');

/**
 * GRUPO 1: USUÁRIOS
 */

// Insere um novo usuário e retorna o registro criado
const criar = async (nome, email, senha_hash, cargo) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha_hash, cargo) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, cargo, criado_em';
    const resultado = await pool.query(sql, [nome, email, senha_hash, cargo]);

    return resultado.rows[0];
    // TODO: Implementar SQL INSERT INTO usuarios ... RETURNING id, nome, email, cargo, criado_em
};

// Busca usuário por email para login
const buscarPorEmail = async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email = $1';
    const resultado = await pool.query(sql, [email]);
    return resultado.rows[0];
    };

// Busca usuário por ID para o perfil
const buscarPorId = async (id) => {
    const sql = 'SELECT id, nome, email, cargo, criado_em FROM usuarios WHERE id = $1';
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
};

module.exports = {criar, buscarPorEmail, buscarPorId };