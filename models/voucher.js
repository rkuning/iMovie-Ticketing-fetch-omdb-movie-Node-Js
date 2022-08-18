"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  voucher.init(
    {
      code: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      is_valid: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: (voucher, options) => {
          voucher.is_valid = true;
        },
      },
      sequelize,
      modelName: "voucher",
    }
  );
  return voucher;
};
