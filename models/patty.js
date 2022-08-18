"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      patty.belongsTo(models.user, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  patty.init(
    {
      userId: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.balance = 0;
        },
      },
      sequelize,
      modelName: "patty",
    }
  );
  return patty;
};
