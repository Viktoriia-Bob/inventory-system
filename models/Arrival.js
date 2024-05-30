const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Arrival = sequelize.define('Arrival', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Arrival;
