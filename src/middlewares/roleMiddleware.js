/**
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

module.exports = autorizarCargos;