const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const { Department } = require("./Department");
const { User } = require("./User");

const WellnessEntry = sequelize.define("WellnessEntry", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  department_id: { type: DataTypes.INTEGER, allowNull: false },
  stress_level: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
  work_hours: { type: DataTypes.DECIMAL(4, 2), allowNull: false, validate: { min: 0, max: 24 } },
  sleep_hours: { type: DataTypes.DECIMAL(4, 2), allowNull: false, validate: { min: 0, max: 24 } },
  mood: { type: DataTypes.STRING(80), allowNull: false },
  energy_level: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
  submission_date: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: "wellness_entries",
  indexes: [
    { fields: ["department_id", "submission_date"] },
    { fields: ["user_id", "submission_date"] }
  ]
});

WellnessEntry.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
WellnessEntry.belongsTo(Department, { foreignKey: "department_id", onDelete: "RESTRICT" });

module.exports = { WellnessEntry };
