const db = require('../service/database');


exports.add = (req, res, next) => {

    const branchId = req.params.branchId;

    db.execute('INSERT INTO employees(name, designation, salary, branchid, time) VALUES (?, ?, ?, ?, ? )', [req.body.name, req.body.designation, req.body.salary, branchId, req.body.time]).then(([rows, fieldData]) => {
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

exports.getAllEmployees = (req, res, next) => {
    const branchId = req.params.branchId;
    db.execute('SELECT * FROM employees WHERE branchid = ? ', [branchId]).then(([rows, fieldData]) => {
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

exports.updateEmployee = (req, res, next) => {
    const id = req.params.id;

    db.execute('UPDATE employees SET name = ?, designation = ?, salary = ? , time = ? WHERE id = ?', [req.body.name, req.body.designation, req.body.salary, id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Employee updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.removeEmployee = (req, res, next) => {
    const id = req.params.id;

    db.execute('UPDATE employees SET branchid = ? WHERE id = ?', [0, id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Employee Removed",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}