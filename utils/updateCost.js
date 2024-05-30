const getStock = require('./getStock');
const { Cost, ArrivalProduct, OrderProduct, Arrival, Order } = require('../models');
const { Op } = require('sequelize');

const getFirstDayOfMonth = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
};

const updateCost = async (product_id, date) => {
    const firstDayOfMonth = getFirstDayOfMonth(date);

    const previousCost = await Cost.findOne({
        where: {
            product_id,
            date: {
                [Op.lte]: firstDayOfMonth
            }
        },
        order: [['date', 'DESC']]
    });

    const previousStock = previousCost ? await getStock(product_id, previousCost.date) : 0;
    const previousTotalCost = previousCost ? previousCost.value * previousStock : 0;

    const arrivals = await ArrivalProduct.findAll({
        include: [{
            model: Arrival,
            where: {
                date: {
                    [Op.lte]: firstDayOfMonth
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
                    [Op.lte]: firstDayOfMonth
                }
            }
        }],
        where: {
            product_id
        }
    });

    const totalArrivalsCost = arrivals.reduce((sum, arrival) => sum + (arrival.price * arrival.quantity), 0);
    const totalArrivalsQuantity = arrivals.reduce((sum, arrival) => sum + arrival.quantity, 0);

    const totalOrdersQuantity = orders.reduce((sum, order) => sum - order.quantity, 0);

    const newStock = previousStock + totalArrivalsQuantity + totalOrdersQuantity;

    // Ensure no division by zero
    const newCost = newStock > 0 ? (previousTotalCost + totalArrivalsCost) / newStock : previousCost ? previousCost.value : 0;

    await Cost.create({
        product_id,
        date: firstDayOfMonth,
        value: newCost
    });
};

module.exports = updateCost;
