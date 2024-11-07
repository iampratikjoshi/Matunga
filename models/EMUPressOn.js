const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const EMUPressOn = sequelize.define(
  "EMUPressOn",
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
    WheelType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ATLNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AWheelSide: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BWheelSide: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ARASide: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BRASide: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    OperatorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    VTLNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BoreSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RAValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TopX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TopY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MiddleX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MiddleY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    LowerX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    LowerY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AvgX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AvgY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BWheelSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CBAIntAllow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    PressureInTon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RDNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAParticulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    VTLNoB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BoreSizeB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RAValueB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    OperatorNameB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BTopX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BTopY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BMiddleX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BMiddleY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BLowerX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BLowerY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BAvgX: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BAvgY: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BWheelSeatSizeB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CBAIntAllowB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    PressureInTonB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RDNoB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAParticularsB: {
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
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "EMUPressOn",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = EMUPressOn;