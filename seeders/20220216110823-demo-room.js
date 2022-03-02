'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rooms', [{
      name: 'C01',
      availability: ["09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C02',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C03',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C04',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C05',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C06',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C07',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C08',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C09',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'C10',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'coke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P01',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P02',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P03',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P04',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P05',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P06',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P07',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P08',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P09',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'P10',
      availability: ["06-07","07-08", "08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"],
      company: 'pepsi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
