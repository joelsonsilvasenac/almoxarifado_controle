const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: CONTROLADOR DE USUÁRIOS
 */
const login = async (req, res) => {
    // TODO: Autenticar email/senha, e gerar JWT contendo { id, cargo }
    res.status(501).json({ mensagem: 'usuarioController.login ainda não implementado.' });
};

const criarUsuario = async (req, res) => {
    // TODO:
    // Regra RBAC de Cadastro:
    // - Se req.usuario_cargo === "SuperAdmin": pode criar "admin" ou "usuario"
    // - Se req.usuario_cargo === "admin": só pode criar "usuario"
    res.status(501).json({ mensagem: 'usuarioController.criarUsuario ainda não implementado.' });
};

const verPerfil = async (req, res) => {
    // TODO: Buscar usuário por id (req.usuario_id)
    res.status(501).json({ mensagem: 'usuarioController.verPerfil ainda não implementado.' });
};

module.exports = { login, criarUsuario, verPerfil };