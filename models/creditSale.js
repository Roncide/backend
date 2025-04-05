const db = require('../config/db');

const CreditSale = {
    create: (creditSaleData, callback) => {
        const query = `
            INSERT INTO credit_sales 
            (produce_name, tonnage, amount_due, buyer_name, national_id, location, due_date, sales_agent, date, buyer_contact, branch)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [
            creditSaleData.produce_name,
            creditSaleData.tonnage,
            creditSaleData.amount_due,
            creditSaleData.buyer_name,
            creditSaleData.national_id,
            creditSaleData.location,
            creditSaleData.due_date,
            creditSaleData.sales_agent,
            creditSaleData.date,
            creditSaleData.buyer_contact,
            creditSaleData.branch
        ], callback);
    },

    getAll: (branch, callback) => {
        const query = 'SELECT * FROM credit_sales WHERE branch = ?';
        db.query(query, [branch], callback);
    },

    getOverdue: (branch, currentDate, callback) => {
        const query = 'SELECT * FROM credit_sales WHERE branch = ? AND due_date < ? AND amount_due > 0';
        db.query(query, [branch, currentDate], callback);
    }
};

module.exports = CreditSale;