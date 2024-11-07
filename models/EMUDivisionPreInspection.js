const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Import your Sequelize instance

const EMUDivisionPreInspection = sequelize.define('EMUDivisionPreInspection', {
    wheelid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    SectionId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DepartmentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    WheeltypeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    WheelNo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    LooryNo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    POHDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    divisionreport: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    DivisionName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    matungareport: {
        type: DataTypes.STRING(255),
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
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    modifiedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'EMUDivisionPreInspection',
    timestamps: false // To manage createdDate and modifiedDate manually
});

module.exports = EMUDivisionPreInspection;
