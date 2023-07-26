const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve('public');
const session = require('express-session')
const bodyParser = require('body-parser')

app.use(express.static(publicPath));
app.set('view engine', 'ejs')
app.set('views', 'src/views')


const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE


//Middlewares
app.use(express.urlencoded({extended: false})); //Para poder trabajar con los datos del JSON
app.use(express.json())
app.use(methodOverride('_method'))//Para poder utilizar metodo PUT/PATH/DELETE
app.use(session({
    secret: "esto es un secreto",
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const puerto = 3000;
app.listen(puerto, ()=> {
    console.log('Servidor funcionando en el puerto 3000')
});


//Routes
const homeRouter = require('./src/routers/homeRouter')
const cartRouter = require('./src/routers/cartRouter')
const usersRouter = require('./src/routers/usersRouter')
const productRouter= require('./src/routers/productRouter')
const logMiddleware = require ('./src/middlewares/logMiddleware')

app.use('/',homeRouter)
app.use('/cart',cartRouter)
app.use('/users', usersRouter)
app.use('/product', productRouter)
app.use(logMiddleware)






