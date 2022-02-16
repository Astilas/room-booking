'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rooms', [{
      name: 'room1',
      availability: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
