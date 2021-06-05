const db = require('../service/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');

// REGISTER USER FUNCTION
exports.registerUser = (req, res, next) => {
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    db.execute('INSERT INTO users(userName, password, branchCode, balance) VALUES (?, ?, ?, ?)', [req.body.userName, req.body.password, req.body.branchCode, 0]).then(([rows, fieldData]) => {
        var str = JSON.stringify(rows);
        var object = JSON.parse(str);
        res.status(200).json({
            message: 'Verification code has been sent to your number',
            account: "Account created successfully",
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

// LOGIN USER FUNCTION
exports.loginUser = (req, res, next) => {
    db.execute('SELECT * FROM users WHERE email = ?', [req.body.email]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if (validPassword) {
                res.status(200).json({
                    message: 'Login Successful',
                    success: true,
                    userId: rows[0].id,
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