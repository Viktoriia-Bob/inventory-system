const express = require('express');
const router = express.Router();
const { Cost } = require('../models');
const { Op } = require('sequelize');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    try {
        const cost = await Cost.findOne({
            where: {
                product_id: id,
                date: {
                    [Op.lte]: date ? new Date(date) : new Date()
                }
            },
            order: [['date', 'DESC']]
        });

        if (!cost) {
            return res.status(404).json({ error: 'Cost not found' });
        }

        res.json(cost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
