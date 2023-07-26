'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class producto_categorias extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            producto_categorias.belongsTo(models.productos, {
                foreignKey: 'productoId',
                as: 'producto',
            });
        }
    };
    producto_categorias.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: DataTypes.STRING,
        titulo: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'producto_categorias',
    });
    return producto_categorias;
};