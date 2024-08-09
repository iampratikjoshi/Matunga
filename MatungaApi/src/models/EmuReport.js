const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const EmuReport = sequelize.define('EmuReport', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    WheelNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    WheelType: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    AxleNo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    AtlNo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    WheelSeatSitebyOperatorAside: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    WheelSeatSitebyOperatorBside: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RaValueAside: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RaValueBside: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    OperatorName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    VtlNoA: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    BoreSizebyOperatorA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RaValueA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    OperatorNameA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    BoreSizeA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    WheelSeatSizeA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    intAllowA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    PressOnPressureinTonA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RdNoA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    WheelDiscParticularsA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    XaxisTopA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisTopA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisMiddleA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisMiddleA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisLowerA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisLowerA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisAvgA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisAvgA: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    VtlNoB: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    BoreSizebyOperatorB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RaValueB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    OperatorNameB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    BoreSizeB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    WheelSeatSizeB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    intAllowB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    PressOnPressureinTonB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    RdNoB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    WheelDiscParticularsB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    XaxisTopB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisTopB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisMiddleB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisMiddleB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisLowerB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisLowerB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xaxisAvgB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    yaxisAvgB: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    createdBy: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modifiedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'EmuReportTable',
    timestamps: false // To manage createdDate and modifiedDate manually
});

module.exports = EmuReport;
