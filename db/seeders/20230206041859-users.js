'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        fullname: "Andi Adriansyah",
        address: "Gg. Jalan Raya",
        phone: 082332214455,
        email: "andi1@gmail.com",
        password: "$2b$08$K1EA8U/O0ZTc5jAXeteGTupieWQXyPt.fHmvDb2EQtEpMoNq3QYI.",
        role: "admin"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
