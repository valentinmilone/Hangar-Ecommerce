/* const path = require('path');
const fs = require('fs')
const {validationResult} = require('express-validator')

const User = require('../models/User')

//Requiero el paquete para comparar las contraseñas  que tengo hash
const bcrypt = require('bcryptjs');

const db = require('../../database/models');

const userFilePath = path.resolve('./src/data/user.json');
const user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userController = {
	login: function(req,res){
        res.render(path.resolve(('src/views/user/login.ejs')),
		{
			user: req.session.user
		});
    },

	//validacion de login
	processLogin: (req,res) => {
			// let userToLogin = await db.User.findOne({ where: { email: req.body.email } });

			let userToLogin = User.findByField('email', req.body.email);
			if(userToLogin){
				let contraseñaCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password)
				if(contraseñaCorrecta){
					delete userToLogin.password;
					req.session.user = userToLogin;
					return res.redirect('/users/profile')
				}
					errors: {
						email:{
							msg: 'Las credenciales son invalidas'
						}
					}
				,
				user: req.session.user}
				);
			}
			return res.render(path.resolve(('src/views/user/login.ejs')),{
				errors: {
					email:{
						msg: 'No se encuentra este email'
					}
				},
				user: req.session.user
			});
	},
	//logout de la sesion del usuario
	logout:  (req, res) => {
		req.session.destroy((err) => {
		  if(err) {
			console.log(err);
		  } else {
			res.redirect('/login');
		  }
		});
	  },

	// registro de usuario
	register: (req, res) => {
		return res.render(path.resolve('src/views/user/register.ejs'), {user: req.session.user})
	},
	

	// validacion del registro
		processRegister: async (req, res) => {
		const resultValidation = validationResult(req)
	
       if(resultValidation.errors.length > 0){
        return res.render((path.resolve('src/views/user/register.ejs')), {
               errors: resultValidation.mapped(),
              oldData: req.body,
			  user: req.session.user
          });

        }
		
		let userInDb = await db.User.findOne({
			where: {
				email: req.body.email
			}
		})
		
		if(userInDb) {
			return res.render(path.resolve('src/views/user/register.ejs'),{
				errors: {
					email: {
						msg: "Este email ya esta registrado"
					}
				},
				oldData: req.body,
				
				user: req.session.user
			})
		}

        
		let userToCreate = {
			password: bcrypt.hashSync(req.body.password, 10),
			image: req.file.filename,
			full_name: req.body.full_name,
			email: req.body.email,
			fnac: req.body.fnac,
			rol_id: req.body.rol,
		}

		await db.User.create(userToCreate)

        return res.redirect('/users/login')
		
	},

	//registro de usuario
	profile: (req, res) => {
		return res.render(path.resolve('src/views/user/profile.ejs'), )
	},

	
	
}; */
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');

const userController = {
  login: function (req, res) {
    res.render(path.resolve('src/views/user/login.ejs'), {
      user: req.session.user,
    });
  },

  processLogin: async (req, res) => {
    try {
      const userToLogin = await db.usuarios.findByField('email', req.body.email);
      if (userToLogin) {
        const contraseñaCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password);
        if (contraseñaCorrecta) {
          delete userToLogin.password;
          req.session.user = userToLogin;
          return res.redirect('/');
        }
        return res.render(path.resolve('src/views/user/login.ejs'), {
          errors: {
            email: {
              msg: 'Las credenciales son inválidas',
            },
          },
          user: req.session.user,
        });
      }
      return res.render(path.resolve('src/views/user/login.ejs'), {
        errors: {
          email: {
            msg: 'No se encuentra este email',
          },
        },
        user: req.session.user,
      });
    } catch (error) {
      console.log(error);
      return res.render(path.resolve('src/views/user/login.ejs'), {
        errors: {
          email: {
            msg: 'Hubo un problema en el servidor. Intente nuevamente más tarde.',
          },
        },
        user: req.session.user,
      });
    }
  },

  logout: (req, res) => {
    try {
      req.session.destroy();
      res.redirect('/');
  } catch (error) {
      console.log(error);  
  }
  },
  
  register: (req, res) => {
    return res.render(path.resolve('src/views/user/register.ejs'), { user: req.session.user });
  },

  processRegister: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        return res.render(path.resolve('src/views/user/register.ejs'), {
          errors: resultValidation.mapped(),
          oldData: req.body,
          user: req.session.user,
        });
      }

      let userInDb = await db.usuarios.findByField('email', req.body.email);

      if (userInDb) {
        return res.render(path.resolve('src/views/user/register.ejs'), {
          errors: {
            email: {
              msg: 'Este email ya está registrado',
            },
          },
          oldData: req.body,
          user: req.session.user,
        });
      }

      let userToCreate = {
        password: bcrypt.hashSync(req.body.password, 10),
        image: req.file.filename,
        full_name: req.body.full_name,
        email: req.body.email,
        fnac: req.body.fnac,
        rol_id: req.body.rol,
      };

      await db.usuarios.createOne(userToCreate);

      return res.redirect('/users/login');
    } catch (error) {
      console.log(error);
      return res.render(path.resolve('src/views/user/register.ejs'), {
        oldData: req.body,
        user: req.session.user,
      });
    }
  },
  //profile de usuario
  profile: (req, res) => {
		return res.render(path.resolve('src/views/home.ejs'), )
	},
/*profile: async (req, res) => {
	try {
	  const user = await db.usuarios.findByPk(req.session.user.id, {
		include: {
		  model: db.Roles,
		  as: 'rol'
		}
	  });
	  res.render(path.resolve('src/views/user/profile.ejs'), { user });
	} catch (error) {
	  console.error(error);
	  res.render(path.resolve('src/views/error.ejs'), { error });
	}
  },*/
}


module.exports= userController;
