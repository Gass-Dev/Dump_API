'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Report.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'idUser',
        },
      })
    }
  };
  Report.init({
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    like: DataTypes.INTEGER,
    attachment: DataTypes.STRING,
    user_name: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};