const sequelize = require('../config/database');

const Product = require('./Product');
const Arrival = require('./Arrival');
const ArrivalProduct = require('./ArrivalProduct');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Cost = require('./Cost');

Arrival.hasMany(ArrivalProduct, { foreignKey: 'arrival_id' });
ArrivalProduct.belongsTo(Arrival, { foreignKey: 'arrival_id' });
Product.hasMany(ArrivalProduct, { foreignKey: 'product_id' });
ArrivalProduct.belongsTo(Product, { foreignKey: 'product_id' });

Order.hasMany(OrderProduct, { foreignKey: 'order_id' });
OrderProduct.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderProduct, { foreignKey: 'product_id' });
OrderProduct.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Cost, { foreignKey: 'product_id' });
Cost.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Product,
  Arrival,
  ArrivalProduct,
  Order,
  OrderProduct,
  Cost
};
