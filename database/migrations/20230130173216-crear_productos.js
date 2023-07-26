"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("productos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: Sequelize.STRING,
      descripcion: Sequelize.STRING,
      image: Sequelize.STRING,
      precio: Sequelize.STRING,
      descuento: Sequelize.STRING,

      producto_categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'producto_categorias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      producto_color_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'producto_colores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productos');
  }
};