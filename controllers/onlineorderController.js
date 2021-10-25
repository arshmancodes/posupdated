const db = require('../service/database');


exports.getAll = (req, res, next) => {


    db.execute("SELECT * FROM onlineorder").then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows,
            success: true
        });
    }).catch(err => {
        res.send(err);
    })
}

exports.addOrder = (req, res , next) => {

    db.execute('INSERT INTO onlineorder (name, date, address, orderdetails, amount, mobile) VALUES (?, ?, ?, ?, ?, ?) ', [req.body.name, req.body.date, req.body.address, req.body.orderDetails, req.body.amount, req.body.mobile]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Order Added",
            status: 200,
        })
    }).catch(err => {
        res.status(500).json({
            message: "Failed",
            status: 500,
        })
    })
}