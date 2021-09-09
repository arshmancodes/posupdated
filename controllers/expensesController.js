const db = require('../service/database');

exports.add = (req, res, next) => {

    const branchId = req.params.branchId;

    db.execute('INSERT INTO expenses(name, amount, reason, time, branchid) VALUES (?, ?, ?, ?, ? )', [req.body.name, req.body.amount, req.body.reason, req.body.time, branchId]).then(([rows, fieldData]) => {
        res.status(200).json({
            id: rows.insertId,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.getAllExpenses = (req, res, next) => {
    const branchId = req.params.branchId;
    db.execute('SELECT * FROM expenses WHERE branchid = ? ', [branchId]).then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.updateExpenses = (req, res, next) => {
    const id = req.params.id;

    db.execute('UPDATE expenses SET reason = ? WHERE id = ?', [req.body.reason, id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Expense updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}