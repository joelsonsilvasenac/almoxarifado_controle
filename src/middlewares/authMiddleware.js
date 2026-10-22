const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: MIDDLEWARE DE AUTENTICAÇÃO
 */
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Acesso negado. Verifique o seu crachá (token)' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario_id = payload.id;
        req.usuario_cargo = payload.cargo;

        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Crachá inválido ou vencido!' });
    }
};

module.exports = autenticarToken;