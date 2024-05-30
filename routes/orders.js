const express = require('express');
const router = express.Router();
const { Order, OrderProduct } = require('../models');
const updateCost = require('../utils/updateCost');

router.post('/', async (req, res) => {
    const { date, products } = req.body;

    try {
        const order = await Order.create({ date: new Date(date) });

        for (const product of products) {
            await OrderProduct.create({
                order_id: order.id,
                product_id: product.product_id,
                price: product.price,
                quantity: product.quantity
            });

            await updateCost(product.product_id, date);
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
