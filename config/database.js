const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('inventory-system', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
