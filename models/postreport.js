"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: { name: "idUser" },
      });
    }
  }
  PostReport.init(
    {
      numberStreet: DataTypes.INTEGER,
      street: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      city: DataTypes.STRING,
      report: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PostReport",
    }
  );
  return PostReport;
};
