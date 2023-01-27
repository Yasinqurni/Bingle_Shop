'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('images', { 
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          autoIncrement: true
        }, 
        item_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
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
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Date.now()
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Date.now()
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('images')
  }
}
