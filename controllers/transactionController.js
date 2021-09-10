const db = require('../service/database');


exports.createTransaction = (req, res, next) => {

    const branchId = req.params.branchId;

    const items = req.body.items;

    items.forEach(item => {

        db.execute("UPDATE product SET stock = ? WHERE id = ?", [(parseInt(JSON.stringify(item.product.stock)) + parseInt(JSON.stringify(item.quantity))) - parseInt(JSON.stringify(item.quantity)), JSON.stringify(item.product.id)]).then(([rows, fieldData]) => {
            if (rows.length > 0) { console.log("Stock Updated") } else { console.log('Product not found') }
        }).catch(err => {
            res.status(500).json({
                message: err.message,
                success: false
            });
        })

    });

    db.execute("SELECT balance FROM auth WHERE id = ?", [branchId]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            const balance = rows[0].balance
            db.execute('UPDATE auth SET balance = ? WHERE id = ?', [(balance + req.body.total).toFixed(2), branchId]).then(([balUpdate, fieldData]) => {
                console.log('Balance Update');
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

    db.execute('INSERT INTO transactions(customerId, discount, beforeCoupon, total, items, itemsLength, time, promoUsed, gst, branchid, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [null, req.body.discount, req.body.beforeCoupon, req.body.total, JSON.stringify(items), req.body.itemsLength, req.body.time, req.body.promoUsed, req.body.gst, branchId, "completed"]).then(([transactions, fieldData]) => {

        const transactionId = transactions.insertId;

        db.execute("INSERT INTO customers(customerNumber, customerName, dateOfBirth, transactionId, time, branchid) VALUES (?, ?, ?, ?, ?, ?)", [req.body.customerNumber, req.body.customerName, req.body.dateOfBirth, transactionId, req.body.time, branchId]).then(([customer, fieldData]) => {
            const customerId = customer.insertId;

            db.execute("UPDATE transactions SET customerId = ? WHERE id = ?", [customerId, transactionId]).then(([finalRes, fieldData]) => {

                res.status(200).json({
                    message: "Transaction Complete",
                    success: true
                })

            }).catch((error) => {

                res.status(500).json({
                    message: error.message,
                    success: false
                });
            })

        }).catch((error) => {
            res.status(500).json({
                message: error.message,
                success: false
            });
        })

    }).catch((error) => {
        res.status(500).json({
            message: error.message,
            success: false
        });
    })

}

exports.getTransactions = (req, res, next) => {
    const branchId = req.params.branchId;


    db.execute("SELECT * FROM transactions WHERE branchid = ?", [branchId]).then(([transactions, fieldData]) => {


        for (var i = 0; i < transactions.length; i++) {
            transactions[i].items = JSON.parse(transactions[i].items)
        }


        res.status(200).json(transactions);

    }).catch((error) => {

        res.status(500).json({
            message: error.message,
            success: false
        });
    })

}