'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Reports extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'idUsers',
      });

      this.belongsTo(models.Reports, {
        foreignKey: 'idReports',
      })
    }
  };
  Post_Reports.init({
    numberStreet: DataTypes.INTEGER,
    street: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    like: DataTypes.INTEGER,
    attachement: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post_Reports',
  });
  return Post_Reports;
};