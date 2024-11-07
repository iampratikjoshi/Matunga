const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBScheduledPreIinspection = sequelize.define(
  "LHBScheduledPreIinspection",
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
      allowNull: false,
    },
    AxleNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ReceiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    AxleCondition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CoachNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiameterINA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiameterINB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBDefectNameA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBDefectNameB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // FlageIN: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    // BDNumber: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    BDDefect: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDMakeIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // BDSizeIN: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    RodGaugeIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    SoundTestINA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    SoundTestINB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TypeOfRepair: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MatungaRemark: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiscParticularA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiscParticularB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // CTRBA: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    // CTRBB: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    CTRBNumberA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBNumberB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBMakeA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBMakeB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBStatusA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBStatusB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDThicknessA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDThicknessB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RefurbishmentDetailsA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RefurbishmentDetailsB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBDefectA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBDefectB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBRemarkA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBRemarkB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    FitmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    CTRBRemainingLifeA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBRemainingLifeB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspectorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspectorTicketNo: {
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
    tableName: "LHBPreIinspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBScheduledPreIinspection;
