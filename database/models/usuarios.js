'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
     
    }

    static async findByPk(id) {
      return await usuarios.findByPk(id);
    }

    static async findByField(field, value) {
      return await usuarios.findOne({ where: { [field]: value } });
    }

    static async createOne(userData) {
      return await usuarios.create(userData);
    }

    static async deleteOne(id) {
      return await usuarios.destroy({ where: { id } });
    }
  }

  usuarios.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: DataTypes.STRING,
    fnac: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuarios',
  });

  return usuarios;
};
