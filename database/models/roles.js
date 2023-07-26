'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    roles.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'roles',
    });

    return roles;
};