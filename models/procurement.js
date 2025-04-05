const express = require('express');
const router = express.Router();
const Procurement = require('../models/procurement');
const Stock = require('../models/stock');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        // Basic validation
        const requiredFields = ['produce_name', 'type', 'date', 'tonnage', 'cost', 'dealer_name', 'contact', 'selling_price'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        // Validate numeric fields
        if (isNaN(req.body.tonnage) || isNaN(req.body.cost) || isNaN(req.body.selling_price)) {
            return res.status(400).json({ error: 'Tonnage, cost, and selling_price must be numbers' });
        }

        if (!/^\d{10}$/.test(req.body.contact)) {
            return res.status(400).json({ error: 'Contact must be a 10-digit phone number' });
        }

        const procurementData = { ...req.body, branch: req.user.branch };

        // Start transaction
        db.beginTransaction((err) => {
            if (err) throw err;

            Procurement.create(procurementData, (err, result) => {
                if (err) {
                    return db.rollback(() => res.status(500).json({ error: err.message }));
                }

                Stock.updateStockFromProcurement(procurementData, (err, stockResult) => {
                    if (err || stockResult.affectedRows === 0) {
                        return db.rollback(() => res.status(500).json({ error: 'Failed to update stock' }));
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => res.status(500).json({ error: err.message }));
                        }
                        res.status(201).json({ message: 'Procurement recorded and stock updated successfully' });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', auth, (req, res) => {
    Procurement.getAll(req.user.branch, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;