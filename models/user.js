'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here-
      models.User.hasMany(models.Post_reports);
    }
  };
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    numberStreet: DataTypes.INTEGER,
    street: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};