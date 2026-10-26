const fs = require('fs');
const path = require('path');

const files = {
    '.env': `DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=sua_senha_do_banco
DB_PORT=5432
PORT=3000
JWT_SECRET=chave_secreta_almoxarifado_2026`,

    '.gitignore': `node_modules
.env`,

    'schema.sql': `-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cargo VARCHAR(20) NOT NULL DEFAULT 'usuario', -- 'SuperAdmin', 'admin', 'usuario'
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos (com Data de Validade)
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    data_validade DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Solicitações (Sem status, baixa direta no estoque)
CREATE TABLE IF NOT EXISTS solicitacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    produto_id INT NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
    quantidade INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Inicial do SuperAdmin (Senha: super123)
INSERT INTO usuarios (nome, email, senha_hash, cargo) 
VALUES ('Super Administrador', 'superadmin@empresa.com', '$2b$10$eO1v0TGBkX8jC/8c950GIOi1L9B0s8M8/Z641H0S6993c8.9958gC', 'SuperAdmin')
ON CONFLICT (email) DO NOTHING;`,

    'src/config/db.js': `const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;`,

    'src/repositories/usuarioRepository.js': `const pool = require('../config/db');

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

module.exports = { criar, buscarPorEmail, buscarPorId };`,

    'src/repositories/produtoRepository.js': `const pool = require('../config/db');

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

module.exports = { criar, listarTodos, buscarPorId, atualizarEstoque };`,

    'src/repositories/solicitacaoRepository.js': `const pool = require('../config/db');

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

module.exports = { criar, listarPorUsuario, listarTodas };`,

    'src/middlewares/authMiddleware.js': `const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: MIDDLEWARE DE AUTENTICAÇÃO
 */
const autenticarToken = (req, res, next) => {
    // TODO:
    // 1. Ler req.headers.authorization
    // 2. Extrair o token do formato "Bearer TOKEN"
    // 3. Validar com jwt.verify(token, process.env.JWT_SECRET)
    // 4. Anotar req.usuario_id e req.usuario_cargo
    // 5. Chamar next() ou retornar erro 401
    res.status(501).json({ mensagem: 'authMiddleware ainda não implementado.' });
};

module.exports = autenticarToken;`,

    'src/middlewares/roleMiddleware.js': `/**
 * GRUPO 1: MIDDLEWARE DE AUTORIZAÇÃO (RBAC)
 */
const autorizarCargos = (...cargosPermitidos) => {
    return (req, res, next) => {
        // TODO:
        // 1. Ler req.usuario_cargo
        // 2. Verificar se cargosPermitidos.includes(req.usuario_cargo)
        // 3. Chamar next() ou retornar status 403 Forbidden
        res.status(501).json({ mensagem: 'roleMiddleware ainda não implementado.' });
    };
};

module.exports = autorizarCargos;`,

    'src/controllers/usuarioController.js': `const usuarioRepository = require('../repositories/usuarioRepository');
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

module.exports = { login, criarUsuario, verPerfil };`,

    'src/controllers/produtoController.js': `const produtoRepository = require('../repositories/produtoRepository');

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

module.exports = { criarProduto, listarProdutos, atualizarProduto };`,

    'src/controllers/solicitacaoController.js': `const solicitacaoRepository = require('../repositories/solicitacaoRepository');
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

module.exports = { criarSolicitacao, minhasSolicitacoes, listarTodas };`,

    'src/routes/usuarioRoutes.js': `const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/login', usuarioController.login);
router.get('/me', authMiddleware, usuarioController.verPerfil);
router.post('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), usuarioController.criarUsuario);

module.exports = router;`,

    'src/routes/produtoRoutes.js': `const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, produtoController.listarProdutos);
router.post('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), produtoController.criarProduto);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), produtoController.atualizarProduto);

module.exports = router;`,

    'src/routes/solicitacaoRoutes.js': `const express = require('express');
const router = express.Router();
const solicitacaoController = require('../controllers/solicitacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, solicitacaoController.criarSolicitacao);
router.get('/minhas', authMiddleware, solicitacaoController.minhasSolicitacoes);
router.get('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), solicitacaoController.listarTodas);

module.exports = router;`,

    'app.js': `const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const solicitacaoRoutes = require('./src/routes/solicitacaoRoutes');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/solicitacoes', solicitacaoRoutes);

module.exports = app;`,

    'server.js': `const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('🚀 Servidor do Almoxarifado rodando na porta ' + PORT);
});`
};

Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('✅ Criado: ' + filePath);
});

console.log('\n📦 Esqueleto do Almoxarifado gerado com sucesso!');
console.log('Rode: npm install express pg dotenv bcrypt jsonwebtoken');
