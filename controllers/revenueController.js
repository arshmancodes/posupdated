const db = require('../service/database');

exports.getAll = (req, res, next) => {
    const branchId = req.params.branchId

    db.execute('SELECT * FROM revenue WHERE branchid = ?', [branchId]).then(([rows, fieldData]) => {
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

    db.execute('SELECT * FROM revenue WHERE branchid = ?', [id]).then(([rows, fieldData]) => {
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

exports.add = (req, res, next) => {
    const branchId = req.params.branchId
    const { closing_balance, date } = req.body

    db.execute('INSERT INTO revenue (closing_balance, date, branchid) VALUES (?, ?, ?)', [req.body.closing_balance, req.body.date, req.body.branchid]).then(([rows, fieldData]) => {

        db.execute('UPDATE auth SET balance = ? WHERE branchid = ?', [0, req.body.branchid]).then(([rows, field]) => {
            res.status(200).json({
                data: 'Revenue added',
                success: true
            });
        })


    }).catch(err => {
        
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}