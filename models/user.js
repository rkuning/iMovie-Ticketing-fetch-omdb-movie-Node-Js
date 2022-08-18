"use strict";
const { Model } = require("sequelize");
const { encryptPw } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.patty, {
        as: `user`,
        foreignKey: "userId",
        onDelete: "cascade",
      });
      user.belongsToMany(models.movie, { through: models.ticket });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      level: DataTypes.STRING,
      status: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = encryptPw(user.password);
          user.level = "user";
          user.status = "active";
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
