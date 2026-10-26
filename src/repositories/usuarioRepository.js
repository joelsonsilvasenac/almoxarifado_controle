const pool = require('../config/db');

/**
 * GRUPO 1: USUÁRIOS
 */

// Insere um novo usuário e retorna o registro criado
const criar = async (nome, email, senha_hash, cargo) => {
    // TODO: Implementar SQL INSERT INTO usuarios ... RETURNING id, nome, email, cargo, criado_em
    throw new Error('usuarioRepository.criar() ainda não implementado.');
};

// Busca usuário por email para login
const buscarPorEmail = async (email) => {
    // TODO: Implementar SQL SELECT * FROM usuarios WHERE email = $1
    throw new Error('usuarioRepository.buscarPorEmail() ainda não implementado.');
};

// Busca usuário por ID para o perfil
const buscarPorId = async (id) => {
    // TODO: Implementar SQL SELECT id, nome, email, cargo, criado_em FROM usuarios WHERE id = $1
    throw new Error('usuarioRepository.buscarPorId() ainda não implementado.');
};

module.exports = { criar, buscarPorEmail, buscarPorId };