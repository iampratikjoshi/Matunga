const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const JointInspection = sequelize.define(
  "JointInspection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto increment the id value
    },
    Wheelid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    JointRemark: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    WheelTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Jointtbl",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = JointInspection;
