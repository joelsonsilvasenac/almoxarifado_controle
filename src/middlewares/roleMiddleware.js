/**
 * Middleware de autorização por cargo (RBAC).
 * Use roleMiddleware('admin', 'SuperAdmin') ou roleMiddleware(['admin', 'SuperAdmin']).
 */
const autorizarCargos = (...cargosPermitidos) => {
    // Achata a lista para manter compatibilidade com os dois formatos de chamada.
    const cargos = cargosPermitidos.flat();

    return (req, res, next) => {
        if (!cargos.includes(req.usuario_cargo)) {
            return res.status(403).json({ mensagem: 'Acesso negado para este cargo.' });
        }
        return next();
    };
};

module.exports = autorizarCargos;
