const jwt = require('jsonwebtoken');

/** Valida o Bearer token e disponibiliza identidade/cargo para as rotas. */
const autenticarToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    const [esquema, token] = authorization ? authorization.split(' ') : [];
    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ mensagem: 'Token de autenticação ausente ou malformado.' });
    }
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET não está configurado.');
        return res.status(500).json({ mensagem: 'Configuração de autenticação indisponível.' });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Aceita as chaves id/cargo usadas pelo projeto e as chaves padronizadas.
        req.usuario_id = payload.id ?? payload.usuario_id;
        req.usuario_cargo = payload.cargo ?? payload.usuario_cargo;
        if (!req.usuario_id || !req.usuario_cargo) {
            return res.status(401).json({ mensagem: 'Token não contém usuário e cargo válidos.' });
        }
        return next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
};

module.exports = autenticarToken;
