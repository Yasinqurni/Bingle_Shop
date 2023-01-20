'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('carts', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }, 
        total_price: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
      })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('carts')
  }
};
