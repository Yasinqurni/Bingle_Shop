'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('categories', [
      {
        id: 'f3d88001-f267-4683-8a6a-a4f1edbfc3da',
        category_name: 'mie instan'
      },
      {
        id: '68d01331-48e3-4708-bd5d-cadb91574fc1',
        category_name: 'bumbu dapur'
      },
      {
        id: 'b972b14f-403a-4c08-b781-e0621892421f',
        category_name: 'tisu'
      },
      {
        id: 'c7b2e447-4c1c-4b24-b8db-fb744b339723', 
        category_name: 'shampoo'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('People', null, {})
  }
}
