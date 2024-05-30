const { ArrivalProduct, OrderProduct, Arrival, Order} = require('../models');
const { Op } = require('sequelize');

const getStock = async (product_id, date) => {
    const arrivals = await ArrivalProduct.findAll({
        include: [{
            model: Arrival,
            where: {
                date: {
                    [Op.lte]: new Date(date)
                }
            }
        }],
        where: {
            product_id
        }
    });

    const orders = await OrderProduct.findAll({
        include: [{
            model: Order,
            where: {
                date: {
                    [Op.lte]: new Date(date)
                }
            }
        }],
        where: {
            product_id
        }
    });

    const totalArrivals = arrivals.reduce((sum, arrival) => sum + arrival.quantity, 0);
    const totalOrders = orders.reduce((sum, order) => sum - order.quantity, 0);

    return totalArrivals + totalOrders;
};

module.exports = getStock;