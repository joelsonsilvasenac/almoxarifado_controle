-- Tabela de Usuários
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
ON CONFLICT (email) DO NOTHING;