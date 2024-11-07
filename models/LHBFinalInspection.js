const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBFinalInspection = sequelize.define(
  "LHBFinalInspection",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
    },
    WheelNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Shift:{
      type:DataTypes.STRING(255),
      allowNull:false
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
    AxleNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiaA : {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiaB : {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelRG: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelFLG: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SizeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SizeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OvalA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OvalB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TapA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TapB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ShoulderSizeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ShoulderSizeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    JrWaivinessA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    JrWaivinessB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BDMake: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BDSizeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BDSizeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    EndHoleA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    EndHoleB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // BRGRemainLife: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    // BRGMake: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    // BRGNo: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    MEPA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MEPB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    USTName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    FittingDt: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ECATest: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // FinalInspectionRemark: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    RefurbishmentDetailsA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RefurbishmentDetailsB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBNumberA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBNumberB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBMakeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBMakeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBStatusA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBStatusB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBRemainingLifeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CTRBRemainingLifeB: {
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
    WheelTreadUST: {
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
    tableName: "LHBFinalInspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBFinalInspection;
