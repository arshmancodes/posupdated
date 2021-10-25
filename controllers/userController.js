const db = require('../service/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');


// REGISTER USER FUNCTION
exports.registerUser = (req, res, next) => {
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);


    db.execute('SELECT * FROM user WHERE email = ?', [req.body.email]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            if (rows[0].email == req.body.email) {
                res.status(409).json({
                    message: 'Email Already exists',
                    success: false
                });
                next();
            }
        } else {
            db.execute('SELECT * FROM user WHERE phone = ?', [req.body.phone]).then(([numberRows, fieldData]) => {
                if (numberRows.length > 0) {
                    if (numberRows[0].phone == req.body.phone) {
                        res.status(409).json({
                            message: 'Phone number already exists',
                            success: false
                        });
                        next();
                    }
                } else {
                    db.execute('INSERT INTO user(username, email, password, phone, dob, address, lat, lon, fcmToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.username, req.body.email, req.body.password, req.body.phone, req.body.dob, req.body.address, req.body.lat, req.body.lon, req.body.fcmToken]).then(([rows, fieldData]) => {
                        res.status(200).json({
                            message: "Account created successfully",
                            success: true,
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: err.message,
                            success: false
                        });
                    });
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })


}

// ADD FCM TOKEN
exports.addFcmToken = (req, res, next) => {
    const id = req.params.id;
    const token = req.body.fcmToken;
    db.execute("UPDATE user SET fcmToken = ? WHERE id = ?", [token, id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: rows,
            success: true
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}

// LOGIN USER FUNCTION
exports.loginUser = (req, res, next) => {
    db.execute('SELECT * FROM user WHERE email = ?', [req.body.email]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if (validPassword) {

                res.status(200).json({
                    message: 'Login Successful',
                    userId: rows[0].id,
                    success: true,
                });

            } else {

                res.status(404).json({
                    message: "Invalid Password",
                    success: false
                });

            }

        } else {
            res.status(404).json({
                message: "Invalid Email or Password",
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