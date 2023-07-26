let express = require('express')
let router = express.Router()

const homeController = require ('../../src/controllers/homeController')

router.get('/', homeController.index); 
//router.get('/search', homeController.search); 


//ruta de perfil logueado o deslogueado
//si no estoy logueado y quiero entrar a /perfil
//router.get('/perfil', middleWareProtection, multer, controle)

//si yo estoy logueado
//no poria ver el loguin registro, ni recuperar contraseña
//router.get('/login', middlewareLogueado)


module.exports = router;
