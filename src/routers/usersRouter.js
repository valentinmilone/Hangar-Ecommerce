let express = require('express')
let router = express.Router()
const path = require('path');


//Requiero expres-validator
const { body } = require('express-validator');



//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
const multer = require('multer');

const userController = require ('../../src/controllers/userController')


//Requiero la variable que contiene la validacion 
const validateRegister = require('../middlewares/validateRegisterMiddleware');

//Requiero la variable que contiene multer 
const uploadFile = require('../middlewares/multerMiddleware');



//RUTAS

router.get('/register', userController.register)

router.post('/register', uploadFile.single('imagenUsuario'), validateRegister, userController.processRegister);

router.get('/login', userController.login);

router.post('/login', userController.processLogin);

router.get('/logout', userController.logout);

router.get('/profile', userController.profile);

module.exports = router;








//este era el codigo del archivo authRouter que fue eliminado
/*
let express = require('express')
let router = express.Router()
const multer = require('multer');
const { dirname } = require('path');
const path = require('path');
const authController = require ('../../src/controllers/authController')

//se indica a Multer donde se guardaran los archivos y con que nombre
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(--dirname, '../public/imagenes/fotoperfil' ))
    },
    //nombre que se le dara al archivo 
    filename: (req, file, cb) =>{
        const newFilename = 'imagperfil-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename );
    }
});
//ejecucion  
const upload = multer ({storage});

router.get('/register', authController.renderRegister)

//Procesamiento de formulario
router.post('/', upload.single('imagenUsuario'), authController.store)

router.get('/login', authController.renderLoggin)

module.exports = router
*/


