const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const ICFScheduledPreIinspection = sequelize.define(
  "ICFScheduledPreIinspection",
  {
    WheelId: {
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
    ShopSrNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    AxleNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ReceiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    AxleCondition: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CoachNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DiameterINA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DiameterINB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgCodeA: {
      type: DataTypes.STRING(255),
      allowNull: true, // Can be adjusted if required
    },
    BrgCodeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgYearA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgYearB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgMakeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgMakeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    FitmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Can be adjusted if required
    },
    BrgFitmentA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgFitmentB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgServiceA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgServiceB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MTNBrgSideA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MTNBrgSideB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    WheelType: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Shift: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    GNameAside: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    GNameBside: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RodGaugeIN: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SoundTestINA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SoundTestINB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TypeOfRepair: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MatungaRemark: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    InspectorName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    InspectorTicketNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DiscParticularA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DiscParticularB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RCDMA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RCDMB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RCMA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RCMB: {
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
    tableName: "ICFPreIinspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = ICFScheduledPreIinspection;
