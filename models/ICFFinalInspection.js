// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database.js"); // Import your Sequelize instance

// const ICFFinalInspection = sequelize.define(
//   "ICFFinalInspection",
//   {
//     wheelid: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     WheelNo: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     Shift:{
//       type:DataTypes.STRING(255),
//       allowNull:false
//     },
//     SectionId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     DepartmentId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     WheeltypeId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     AxleNo: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     WheelDiaA : {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     WheelDiaB : {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     WheelRG: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     WheelFLG: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     SizeA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     SizeB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     OvalA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     OvalB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     TapA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     TapB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     ShoulderSizeA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     ShoulderSizeB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     JrWaivinessA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     JrWaivinessB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     BDMake: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     BDSizeA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     BDSizeB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     EndHoleA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     EndHoleB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     MEPA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     MEPB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     USTName: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     FittingDt: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     ECATest: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     RefurbishmentDetailsA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     RefurbishmentDetailsB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBNumberA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBNumberB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBMakeA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBMakeB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBStatusA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBStatusB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBRemainingLifeA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     CTRBRemainingLifeB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     DiscParticularA: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     DiscParticularB: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     WheelTreadUST: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     InspectorName: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     InspectorTicketNo: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     createdBy: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     modifiedBy: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     createdDate: {
//       type: DataTypes.DATEONLY,
//       defaultValue: DataTypes.NOW,
//     },
//     modifiedDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     tableName: "ICFFinalInspection",
//     timestamps: false, // To manage createdDate and modifiedDate manually
//   }
// );

// module.exports = ICFFinalInspection;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const ICFFinalInspection = sequelize.define(
  "ICFFinalInspection",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    WheelNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TypeOfWheel: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    ParticularAX1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularAX2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularAX3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularAY1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularAY2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularAY3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TaperXA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TaperYA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ShoulderSizeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OvalityA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBX1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBX2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBX3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBY1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBY2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParticularBY3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TaperXB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TaperYB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ShoulderSizeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    OvalityB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    WearTear: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Bend: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    AxleEndHole: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgCodeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgYearA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MTNBrgNoA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgMakeA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RadialClearanceDismountedA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RadialClearanceMountedA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgInitialFitmentMonthA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgServiceInMonthA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgCodeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgYearB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    MTNBrgNoB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgMakeB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RadialClearanceDismountedB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    RadialClearanceMountedB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgInitialFitmentMonthB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    BrgServiceInMonthB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    FitmentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Shift: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    GangNameA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    GangNameB: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    InspectorName: {
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
    tableName: "ICFFinalInspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = ICFFinalInspection;

