'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    static associate(models) {
      // define association here
      models.Reports.hasMany(models.Post_Reports);
    }
  };
  Reports.init({
    report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};