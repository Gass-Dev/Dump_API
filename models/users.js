"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      models.Users.hasMany(models.Post_Reports);
    }
  }
  Users.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      numberStreet: DataTypes.INTEGER,
      street: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
