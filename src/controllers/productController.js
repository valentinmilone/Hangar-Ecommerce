/* const path = require('path');
const fs = require('fs')


const productsFilePath = path.resolve('./src/data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	// listado de todos los productos
	index: (req, res) => {
	res.render(('productList'), {product: products});
	},
	

	// detalle de un producto
	detail: (req, res) => {
		const productId = req.params.productId
		const productToFind = products.find((product) => product.id == productId)
		if(productToFind == undefined){
			return res.send('No se encontro el producto buscado')
		}
		return res.render(('detail'), {productToFind: productToFind,
		user: req.session.user})

	},

	// Crear - Form de creacion de un producto
	create: (req, res) => {
		res.render('createproduct');
	},
	
	// Create -  accion de creacion 
	store: (req, res) => {
		const camposNuevosProductos = req.body;
		camposNuevosProductos.id = products.length + 1
		products.push(camposNuevosProductos)
		const jsonProduct = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, jsonProduct) 

		res.redirect("/")
	},

	// Actualizar - Form para editar
	edit: (req, res) => {
		const productId = req.params.productId
		const productToFind = products.find((product) => product.id == productId)
			if(productToFind == undefined){
				return res.send('No se encontro el producto buscado')
			}
			
			return res.render(('editProduct'), {productToFind: productToFind })
	
			
		},

	// Actualizar un producto
	update: (req, res) => {
		const update = req.body
		update.price = Number(update.price)
		update.discount= Number(update.discount)
		
		const productIndex = products.findIndex((product)=>{
			return product.id == req.params.id
		})
		if(productIndex == -1){
			return res.send("No existe el producto")
		}
		products[productIndex] = {...products[productIndex], ...update}

		const jsonProduct = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, jsonProduct) 
		
		res.redirect("/")
		
	},


	// Eliminar un producto
	destroy : (req, res) => {
		const productId = req.params.id
		const productsNuevo = products.filter(function(product){
		return product.id != productId
		})
		const jsonProduct = JSON.stringify(productsNuevo)
		fs.writeFileSync(productsFilePath, jsonProduct)
		
		res.redirect("/")
		}
	
};


module.exports= controller */



const Productos = require('../../database/models').productos;

const controller = {
	// listado de todos los productos
	index: async (req, res) => {
		try {
			const products = await Productos.findAll();
			res.render(('productList'), {product: products});
		} catch (error) {
			console.log(error);
			res.send('Ocurrió un error al obtener los productos');
		}
	},
	

	// detalle de un producto
	detail: (req, res) => {
		Productos.findAll().then(products => {
			const productId = req.params.productId
			const productToFind = products.find((product) => product.id == productId)
			if(productToFind == undefined){
				return res.send('No se encontro el producto buscado')
			}
			return res.render(('detail'), {productToFind: productToFind,
			user: req.session.user})
		}).catch(error => {
			console.log(error);
			res.send('Ocurrió un error al buscar el producto.')
		})
	},

	// Crear - Form de creacion de un producto
	create: (req, res) => {
		res.render('createproduct',{
			user: req.session.user
		});
	},
	
	// Create -  accion de creacion 
	store: async (req, res) => {
		try {
			const camposNuevosProductos = req.body;
			await Productos.create(camposNuevosProductos);
			res.redirect("/");
		} catch (error) {
			console.log(error);
			res.send('Ocurrió un error al crear el producto');
		}
	},

	// Actualizar - Form para editar
	edit: async (req, res) => {
		try {
			const {productId} = req.params;
			const productToFind = await Productos.findByPk(productId);
			if(!productToFind){
				return res.send('No se encontro el producto buscado');
			}
			return res.render(('editProduct'), {productToFind: productToFind, user: req.session.user });
		} catch (error) {
			console.log(error);
			res.send('Ocurrió un error al obtener el producto');
		}
		
	},

	// Actualizar un producto
	update: async (req, res) => {
		try {
			const {productId} = req.params;
			console.log(req.body)
			const productToFind = await Productos.findByPk(productId);

			await productToFind.update({
				...req.body
			})
			res.redirect("/");
		} catch (error) {
			console.log(error);
			res.send('Ocurrió un error al actualizar el producto');
		}
	},

	// Eliminar un producto
	delete : async (req, res) => {
		try {
			const {productId} = req.params;
			await Productos.destroy({
				where: {id: productId}
			});
			res.redirect("/");
		} catch (error) {
			console.log(error);
			res.send('Ocurrió un error al eliminar el producto');
		}
	}
};

module.exports= controller;
