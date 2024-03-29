const db = require('../service/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');

// REGISTER USER FUNCTION
exports.registerUser = (req, res, next) => {
    var empty = null;
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);

    db.execute('SELECT * FROM auth WHERE username = ?', [req.body.username]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            if (rows[0].username == req.body.username) {
                res.status(409).json({
                    message: 'Username Already exists',
                    success: false
                });
                next();
            }
        } else {
            db.execute('INSERT INTO auth(username, password, balance, bankCash, admin, shift, branchid, cnic, phoneNumber, time) VALUES (?, ?, ?, ?, ?, ? , ?, ?, ?, ?)', [req.body.username, req.body.password, req.body.balance, req.body.bankCash, req.body.admin, req.body.shift, req.body.branchId, req.body.cnic, req.body.phoneNumber, req.body.time]).then(([rows, fieldData]) => {
                var str = JSON.stringify(rows);
                var object = JSON.parse(str);
                res.status(200).json({
                    message: "Account created successfully",
                    success: true,
                    userId: object['insertId'],
                });
            }).catch(err => {
                res.status(500).json({
                    message: err.message,
                    success: false
                });
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })




}

// LOGIN USER FUNCTION
exports.loginUser = (req, res, next) => {
    db.execute('SELECT * FROM auth WHERE username = ?', [req.body.username]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if (validPassword) {
                res.status(200).json({
                    message: 'Login Successful',
                    success: true,
                    userId: rows[0].id,
                    branchId: rows[0].branchid == null ? rows[0].id : rows[0].branchid,
                });
            } else {
                res.status(404).json({
                    message: "Invalid email or password",
                    success: false
                });
            }

        } else {
            res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}

exports.getUserById = (req, res, next) => {
    id = req.params.id;
    db.execute("SELECT * FROM auth WHERE id = ?", [id]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            res.status(200).json({
                data: rows[0],
                success: true
            });
        } else {
            res.status(404).json({
                data: 'No data found',
                success: 0
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.getBalanceById = (req, res, next) => {
    id = req.params.id;
    db.execute("SELECT balance FROM auth WHERE id = ?", [id]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({
                data: 'No data found',
                success: 0
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}