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
    static associate({ User, Room }) {
      // define association here
      this.belongsTo(Room, { foreignKey: 'room_id' })
      this.belongsTo(User, { foreignKey: 'user_id' })
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    booking_hour: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    begin_hour: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    end_hour: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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