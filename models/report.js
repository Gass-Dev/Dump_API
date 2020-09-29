'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post_reports);
    }
  };
  Report.init({
    report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};