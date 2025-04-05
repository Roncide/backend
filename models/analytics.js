const db = require('../config/db');

const Analytics = {
    getSalesTrends: (branch, startDate, endDate, callback) => {
        const query = `
            SELECT DATE(date) as sale_date, SUM(amount_paid) as total_sales, SUM(tonnage) as total = SUM(tonnage) as total_tonnage
            FROM sales
            WHERE branch = ? AND date BETWEEN ? AND ?
            GROUP BY DATE(date)
            ORDER BY sale_date
        `;
        db.query(query, [branch, startDate, endDate], callback);
    },

    getStockTurnover: (branch, startDate, endDate, callback) => {
        const query = `
            SELECT produce_name, SUM(tonnage) as total_sold
            FROM sales
            WHERE branch = ? AND date BETWEEN ? AND ?
            GROUP BY produce_name
        `;
        db.query(query, [branch, startDate, endDate], callback);
    },

    getProfitMargins: (branch, startDate, endDate, callback) => {
        const query = `
            SELECT 
                p.produce_name,
                SUM(p.tonnage * (p.selling_price - p.cost)) as total_profit,
                SUM(p.tonnage * p.cost) as total_cost
            FROM procurements p
            JOIN sales s ON p.produce_name = s.produce_name
            WHERE p.branch = ? AND s.date BETWEEN ? AND ?
            GROUP BY p.produce_name
        `;
        db.query(query, [branch, startDate, endDate], callback);
    }
};

module.exports = Analytics;