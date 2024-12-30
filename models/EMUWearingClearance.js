const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const EMUWearingClearance = sequelize.define(
  "EMUWearingClearance",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheeltypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheelNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WearingCodeNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MatungaWNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    V: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Make: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DMA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InitialFittings: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WearingService: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TagStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    FrontCover: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiameter: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleYear: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    StaffTNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspTicket: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "EMUWearingClearance",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = EMUWearingClearance;