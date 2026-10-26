const pool = require('../config/db'); //ajustando o caminho pool/ conexão

/**
 * GRUPO 2: PRODUTOS
 */

// Cadastra um novo produto com data de validade
const criar = async (nome, descricao, quantidade_estoque, data_validade) => {
    const query =`
    INSERT INTO produtos(nome,descricao,quantidade_estoque, data_validade)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
    const values = [nome, descricao, quantidade_estoque, data_validade];
    const resultado = await pool.query(query,values);
    return resultado.rows[0];

};

// Lista todos os produtos
const listarTodos = async () => {
    const sql = 'SELECT * FROM produtos ORDER BY id ASC'
    const resultado = await pool.query(sql);

    return resultado.rows;
};

// Busca produto por ID (Usado na validação de validade e estoque pelo Grupo 3)
const buscarPorId = async (id) => {
    const sql = 'SELECT * FROM produtos WHERE id = $1'
    const resultado = await pool.query(sql, [id]);

    return resultado.rows[0];
};

// Atualiza a quantidade do estoque após a baixa/retirada
const atualizar = async (id, nome, descricao, quantidade_estoque, data_validade) => {
    const sql = 'UPDATE produtos SET nome = $1, descricao = $2, quantidade_estoque = $3, data_validade = $4 WHERE id = $5 RETURNING *';
    const valores = [nome, descricao, quantidade_estoque, data_validade, id];
    const resultado = await pool.query(sql, valores);

    return resultado.rows[0];
};

// Remove pelo ID. RETURNING * retorna a linha removida ou nenhuma linha se inexistente.
const deletar = async (id) => {
    const resultado = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *;', [id]);
    return resultado.rows[0] || null;
};

// Exportações nomeadas preservam os handlers compartilhados pelos integrantes.
module.exports = { criar, listarTodos, buscarPorId, atualizar, deletar };
