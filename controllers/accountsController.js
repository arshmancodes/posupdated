const db = require('../service/database');

exports.getAll = (req, res, next) => {

    const branchId = req.params.branchId;

    db.execute('SELECT * FROM accounts WHERE branchid = ?', [branchId]).then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}

exports.getById = (req, res, next) => {
    const id = req.params.id

    db.execute('SELECT * FROM accounts WHERE id = ?', [id]).then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows[0],
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}

exports.addAccount = (req, res, next) => {
    const branchId = req.params.branchId
    const { name, totalBalance, totalPayable } = req.body

    db.execute('INSERT INTO accounts (name, totalBalance, totalPayable, branchId) VALUES (?, ?, ?, ? )', [name, totalBalance, totalPayable, branchId]).then(([rows, field]) => {
        res.status(200).json({
            data: 'Account added',
            success: true
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}

exports.updateAccountById = (req, res, next) => {
    const id = req.params.id;


    const { name, totalBalance, totalPayable } = req.body

    db.execute('UPDATE accounts SET name = ? , totalBalance = ?, totalPayable = ? WHERE id = ?', [name, totalBalance, totalPayable, id]).then(([rows, field]) => {
        res.status(200).json({
            data: "Account Updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}