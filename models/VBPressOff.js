const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance


const VBPressOff = sequelize.define(
  "VBPressOff",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      allowNull:false,
      // autoIncrement: false,
      primaryKey: true,
    },
    SectionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheeltypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    OperatorTNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    InspectorTNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ShopSNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    TypeOfWheel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelPressedOff: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    DiscSrNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    AxleNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    AxleCondition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleConditionCause: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleConditionReason: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscCondition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscConditionReason: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscConditionCause: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscCondition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscConditionCause: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelConditionReason: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspectorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    OperatorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MachineNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ShiftNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    serviceablediscidnumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Reason: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PressedOffRemark: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.STRING(50),
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
    tableName: "VBPressOff",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = VBPressOff;
