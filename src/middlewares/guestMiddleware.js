const guestValidation = (req,res,next)=>{
    //verificar si el usuario no esta autenticado. y quiere ingresar a ruta privada lo redirige al login
        if(!req.session.user){
            return redidect('/login')
        }
        return next();
    
    }
    module.exports = guestValidation;
