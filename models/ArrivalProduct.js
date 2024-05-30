const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Arrival = require('./Arrival');
const Product = require('./Product');

const ArrivalProduct = sequelize.define('ArrivalProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    arrival_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Arrival,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ArrivalProduct;
