// registros en que pagina ingresa el usuario (Midd global)
const fs = require ('fs');

function logMiddleware (req, res, next){
fs.appendFileSync('log.txt', 'Pagina visitada' + req.url);
next();
}
module.exports = logMiddleware;