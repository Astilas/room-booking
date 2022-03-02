'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const nowDate = new Date()
    const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();

    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setHours(newDate.getHours() + 1);

    return queryInterface.bulkInsert('events', [{
      title: 'cupcakes party',
      description: 'meeting for cupcakes',
      date: date,
      begin_hour: myDate,
      end_hour: newDate,
      booking_hour: ['06-07', '07-08','08-09'],
      user_id: 1,
      room_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('events', null, {});
  }
};
