/* const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve('./src/data/productDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const homeController = {
	index: (req, res) => {
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
		const insaleProducts = products.filter (product => product.category=="in-sale");
		return res.render('home', {product:insaleProducts,
		user: req.session.user});
		//filtrar por visitados
		//const visitedProducts = products.filter (product => product.category=="visited");
		
		//Devolver datos a la vista
		//const viewData = {
			//visitedProducts,
			//insaleProducts


		//}
		
		//Devolver vista con los datos
		
		//return res.render((path.resolve('src/views/productList.ejs')), viewData) ;
	},

    //search: (req, res) => {
	//	res.render('results')
	//},
}; */
const db = require('../../database/models');
const Productos = db.productos;

const homeController = {
	index: async (req, res) => {
		try {
			const products = await Productos.findAll();
			return res.render('home', {
				productos: products,
				user: req.session.user
			});
		} catch (error) {
			console.log(error);
			return res.send('Hubo un error');
		}
	}
};

module.exports = homeController;
