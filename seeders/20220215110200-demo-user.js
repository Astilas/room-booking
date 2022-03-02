'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', [{
        username: 'coucou',
        email: 'coucou@djsi.fr',
        password:'coucou',
        company: "coke",
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
