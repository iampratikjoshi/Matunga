const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const EMUBearingRejection = sequelize.define(
  "EMUBearingRejection",
  {
    Wheelid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WheeltypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BearingNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Make: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CodeorYearofMFG: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DateofRejection: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DateLastInspection: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DateOfInitialFitment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    LifeOfBearing: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CauseOfRejection: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    modifiedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "EMUBearingRejection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = EMUBearingRejection;
