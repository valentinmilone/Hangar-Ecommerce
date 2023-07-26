'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class producto_colores extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            producto_colores.belongsTo(models.productos, {
                foreignKey: 'productoColorId',
                as: 'productoColor',
            });
        }
    };
    producto_colores.init({
        id:{
            type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
        },
        titulo:DataTypes.STRING,
        descripcion:DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'producto_colores',
    });
    return producto_colores;
};