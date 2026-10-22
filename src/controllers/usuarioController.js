const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: CONTROLADOR DE USUÁRIOS
 */
const login = async (req, res) => {
    try {
   
    
const { email, senha } = req.body;

    // 1. Busca se o email existe no banco
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) {
        // Por segurança, não confirmamos qual campo errou.
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 2. Comparando a senha (bcrypt cuida de extrair o Salt sozinho)
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash); // 👈 Comparação segura

    if (!senhaValida) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 3. Sucesso!
    const token = jwt.sign(
      { id: usuario.id, cargo: usuario.cargo}, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      mensagem: 'Login realizado com sucesso!', 
      token: token 
    });
      } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno ao realizar login.' });
    }
};

const criarUsuario = async (req, res) => {
    // TODO:
    // Regra RBAC de Cadastro:
    // - Se req.usuario_cargo === "SuperAdmin": pode criar "admin" ou "usuario"
    // - Se req.usuario_cargo === "admin": só pode criar "usuario"

    try {
        const { nome, email, senha, cargo } = req.body;
        
        if (!nome || !email || !senha || !cargo) {
            return res.status(400).json({ mensagem: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' });
        }

        const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com este e-mail.' });
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        
        const novoUsuario = await usuarioRepository.criar(nome, email, senha_hash, cargo);
        return res.status(201).json(novoUsuario);     
        
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.' });
    }
    
};

const verPerfil = async (req, res) => {
    try {
        const id = req.usuario_id;
        const usuario = await usuarioRepository.buscarPorId(id);
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({mensagem: "Erro busca perfil."});
    }
    // TODO: Buscar usuário por id (req.usuario_id)
    res.status(501).json({ mensagem: 'usuarioController.verPerfil ainda não implementado.' });
};

module.exports = { login, criarUsuario, verPerfil };