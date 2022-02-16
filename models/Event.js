'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    begin_hour: DataTypes.STRING,
    end_hour: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    modelName: 'Event',
    tableName: 'events',
  });
  return Event;
};