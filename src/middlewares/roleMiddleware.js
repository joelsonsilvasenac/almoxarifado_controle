/**
 * GRUPO 1: MIDDLEWARE DE AUTORIZAÇÃO (RBAC)
 */
const autorizarCargos = (...cargosPermitidos) => {
    return (req, res, next) => {
        const cargoUsuario = req.usuario_cargo;
        // Verifica se o cargo do usuário está na lista de cargos permitidos
        if (!cargosPermitidos.includes(cargoUsuario)) {
            return res.status(403).json({ mensagem: 'Acesso negado. Apenas usuários com o perfil [' + cargosPermitidos.join(', ') + '] têm acesso a este recurso.' });
        }
        next();
    };
};

module.exports = autorizarCargos;