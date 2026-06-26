const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Department = sequelize.define("Department", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: "departments",
  // Defect 5: schema.sql does not define Sequelize timestamp columns.
  timestamps: false
});

module.exports = { Department };
