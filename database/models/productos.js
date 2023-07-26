'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class productos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            productos.hasMany(models.producto_categorias, {
                foreignKey: 'productoCategoriaId',
                as: 'productoCategoria',
            });

            productos.hasMany(models.producto_colores, {
                foreignKey: 'productoColorId',
                as: 'productoColor',
            });
       /*      productos.findAll = function findall(productId){
                var query = sql.query('SELECT * FROM Productos WHERE id =' + productId);
                return query;
            } */
        }
    }

    productos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        image: DataTypes.STRING,
        precio: DataTypes.STRING,
        descuento: DataTypes.STRING,
        producto_categoria_id: DataTypes.INTEGER,
        producto_color_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'productos',
    });

    return productos;
};