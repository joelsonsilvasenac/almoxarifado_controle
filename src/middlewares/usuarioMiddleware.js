const autorizarCriacaoUsuario = (req, res, next) => {
    const { usuario_cargo } = req;
    const { cargo } = req.body;

    if (usuario_cargo === 'SuperAdmin') {
        if (!['admin', 'usuario'].includes(cargo)) {
            return res.status(400).json({
                mensagem: 'O SuperAdmin só pode criar contas admin ou usuario.'
            });
        }

        return next();
    }

    if (usuario_cargo === 'admin') {
        if (cargo !== 'usuario') {
            return res.status(403).json({
                mensagem: 'Administradores só podem criar contas usuario.'
            });
        }

        return next();
    }

    return res.status(403).json({
        mensagem: 'Você não tem permissão para criar usuários.'
    });
};

module.exports = { autorizarCriacaoUsuario };