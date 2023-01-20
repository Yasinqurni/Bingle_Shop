'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('images', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }, 
        item_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references : {
            model: "items",
            key: "id",
            as: "item_id"
          }
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false
        },
      })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('images')
  }
}
