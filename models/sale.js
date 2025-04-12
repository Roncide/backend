const express = require('express');
const router = express.Router();
const Analytics = require('../models/analytics');
const auth = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const fs = require('fs');

router.get('/sales-trends', auth, (req, res) => {
    const { startDate, endDate, format } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    Analytics.getSalesTrends(req.user.branch, startDate, endDate, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!format) {
            return res.json(results); // Default JSON response
        }

        switch (format.toLowerCase()) {
            case 'pdf':
                generatePDF(res, 'Sales Trends', results, ['sale_date', 'total_sales', 'total_tonnage']);
                break;
            case 'csv':
            case 'excel':
                generateExcel(res, 'Sales Trends', results, ['sale_date', 'total_sales', 'total_tonnage'], format);
                break;
            default:
                res.status(400).json({ error: 'Invalid format. Use pdf, csv, or excel' });
        }
    });
});

router.get('/stock-turnover', auth, (req, res) => {
    const { startDate, endDate, format } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    Analytics.getStockTurnover(req.user.branch, startDate, endDate, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!format) {
            return res.json(results); // Default JSON response
        }

        switch (format.toLowerCase()) {
            case 'pdf':
                generatePDF(res, 'Stock Turnover', results, ['produce_name', 'total_sold']);
                break;
            case 'csv':
            case 'excel':
                generateExcel(res, 'Stock Turnover', results, ['produce_name', 'total_sold'], format);
                break;
            default:
                res.status(400).json({ error: 'Invalid format. Use pdf, csv, or excel' });
        }
    });
});

router.get('/profit-margins', auth, (req, res) => {
    const { startDate, endDate, format } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    Analytics.getProfitMargins(req.user.branch, startDate, endDate, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!format) {
            return res.json(results); // Default JSON response
        }

        switch (format.toLowerCase()) {
            case 'pdf':
                generatePDF(res, 'Profit Margins', results, ['produce_name', 'total_profit', 'total_cost']);
                break;
            case 'csv':
            case 'excel':
                generateExcel(res, 'Profit Margins', results, ['produce_name', 'total_profit', 'total_cost'], format);
                break;
            default:
                res.status(400).json({ error: 'Invalid format. Use pdf, csv, or excel' });
        }
    });
});

// PDF Generation Function
function generatePDF(res, title, data, columns) {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title.toLowerCase().replace(' ', '-')}.pdf"`);

    doc.pipe(res);
    doc.fontSize(16).text(title, { align: 'center' });
    doc.moveDown();

    // Table headers
    let y = 100;
    const xStart = 50;
    columns.forEach((col, index) => {
        doc.fontSize(12).text(col.replace('_', ' ').toUpperCase(), xStart + (index * 150), y);
    });

    // Table data
    y += 20;
    data.forEach(row => {
        columns.forEach((col, index) => {
            doc.fontSize(10).text(row[col] || 'N/A', xStart + (index * 150), y);
        });
        y += 20;
    });

    doc.end();
}

// Excel/CSV Generation Function
function generateExcel(res, title, data, columns, format) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title);

    // Add headers
    worksheet.columns = columns.map(col => ({
        header: col.replace('_', ' ').toUpperCase(),
        key: col,
        width: 20
    }));

    // Add data
    worksheet.addRows(data);

    if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${title.toLowerCase().replace(' ', '-')}.csv"`);
        workbook.csv.write(res).then(() => res.end());
    } else {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${title.toLowerCase().replace(' ', '-')}.xlsx"`);
        workbook.xlsx.write(res).then(() => res.end());
    }
}

module.exports = router;
