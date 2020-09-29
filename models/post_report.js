'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Report extends Model {
    static associate(models) {
      // define association here
      models.User.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'idUser',
        },
      });

      models.Report.belongsTo(models.Report, {
        foreignKey: {
          allowNull: false,
          name: 'idReport',
        },
      });
    }
  };
  Post_Report.init({
    idUser:DataTypes.INTEGER,
    numberStreet: DataTypes.INTEGER,
    street: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    like: DataTypes.INTEGER,
    attachement: DataTypes.STRING,
    idReport:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post_Report',
  });
  return Post_Report;
};