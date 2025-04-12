const db = require('../config/db');

const Stock = {
    // Initialize or update stock when procurement is made
    updateStockFromProcurement: (procurementData, callback) => {
        const query = `
            INSERT INTO stock (produce_name, branch, tonnage)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE tonnage = tonnage + VALUES(tonnage)
        `;
        db.query(query, [procurementData.produce_name, procurementData.branch, procurementData.tonnage], callback);
    },

    // Reduce stock when sale is made
    updateStockFromSale: (saleData, callback) => {
        const query = `
            UPDATE stock 
            SET tonnage = tonnage - ?
            WHERE produce_name = ? AND branch = ? AND tonnage >= ?
        `;
        db.query(query, [saleData.tonnage, saleData.produce_name, saleData.branch, saleData.tonnage], callback);
    },

    // Get current stock levels
    getStock: (branch, callback) => {
        const query = 'SELECT * FROM stock WHERE branch = ?';
        db.query(query, [branch], callback);
    }
};

module.exports = Stock;