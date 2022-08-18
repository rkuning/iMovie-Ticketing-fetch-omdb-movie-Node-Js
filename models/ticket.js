"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticket.belongsTo(models.user, {
        foreignKey: "userId",
      });
      ticket.belongsTo(models.schedule, {
        foreignKey: "scheduleId",
      });
      ticket.belongsTo(models.studio, {
        foreignKey: "studioId",
      });
      ticket.belongsTo(models.movie, {
        foreignKey: "movieId",
      });
      ticket.belongsTo(models.seat, {
        foreignKey: "seatId",
      });
    }
  }
  ticket.init(
    {
      userId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      scheduleId: DataTypes.INTEGER,
      studioId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      seatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ticket",
    }
  );
  return ticket;
};
