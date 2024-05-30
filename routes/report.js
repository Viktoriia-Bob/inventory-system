const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

router.get('/', async (req, res) => {
    const { from, to } = req.query;

    try {
        const report = await sequelize.query(
            `SELECT
                o.date,
                SUM(op.price * op.quantity) AS summ,
                SUM(op.quantity * COALESCE(
                    (SELECT c.value
                     FROM "Costs" c
                     WHERE c.product_id = op.product_id
                     AND c.date <= o.date
                     ORDER BY c.date DESC
                     LIMIT 1), 0)) AS cost,
                (SUM(op.price * op.quantity) - SUM(op.quantity * COALESCE(
                    (SELECT c.value
                     FROM "Costs" c
                     WHERE c.product_id = op.product_id
                     AND c.date <= o.date
                     ORDER BY c.date DESC
                     LIMIT 1), 0))) AS profit,
                CASE 
                    WHEN SUM(op.quantity * COALESCE(
                        (SELECT c.value
                         FROM "Costs" c
                         WHERE c.product_id = op.product_id
                         AND c.date <= o.date
                         ORDER BY c.date DESC
                         LIMIT 1), 0)) = 0 THEN 0
                    ELSE ((SUM(op.price * op.quantity) - SUM(op.quantity * COALESCE(
                        (SELECT c.value
                         FROM "Costs" c
                         WHERE c.product_id = op.product_id
                         AND c.date <= o.date
                         ORDER BY c.date DESC
                         LIMIT 1), 0))) / SUM(op.quantity * COALESCE(
                        (SELECT c.value
                         FROM "Costs" c
                         WHERE c.product_id = op.product_id
                         AND c.date <= o.date
                         ORDER BY c.date DESC
                         LIMIT 1), 0))) * 100
                END AS profitability
            FROM "Orders" o
            JOIN "OrderProducts" op ON o.id = op.order_id
            WHERE o.date BETWEEN :from AND :to
            GROUP BY o.date
            ORDER BY o.date ASC`,
            {
                replacements: { from: new Date(from), to: new Date(to) },
                type: QueryTypes.SELECT
            }
        );

        const summary = {
            date: null,
            summ: report.reduce((acc, row) => acc + parseFloat(row.summ), 0),
            cost: report.reduce((acc, row) => acc + parseFloat(row.cost), 0),
            profit: report.reduce((acc, row) => acc + parseFloat(row.profit), 0),
            profitability: report.reduce((acc, row) => acc + parseFloat(row.cost), 0) === 0
                ? 0
                : (report.reduce((acc, row) => acc + parseFloat(row.profit), 0) / report.reduce((acc, row) => acc + parseFloat(row.cost), 0)) * 100
        };

        report.push(summary);

        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
