const jwt = require('jsonwebtoken');

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

module.exports = autenticarToken;