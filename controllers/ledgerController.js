const db = require('../service/database');

exports.getAll = (req, res, next) => {

    const accountId = req.params.accountId;

    db.execute('SELECT * FROM ledgers WHERE accountId = ?', [accountId]).then(([rows, fieldData]) => {
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

    db.execute('SELECT * FROM ledgers WHERE id = ?', [id]).then(([rows, fieldData]) => {
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

exports.addLedger = (req, res, next) => {
    const accountId = req.params.accountId
    const { transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit } = req.body


    db.execute('INSERT INTO ledgers (accountId, transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit ) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?)', [accountId, transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit]).then(([rows, field]) => {


        //! UPDATE ACCOUNTS DATA 

        db.execute('SELECT * FROM ledgers WHERE accountId = ?', [accountId]).then(([ledgers, fieldData]) => {
            var totalBusinessAmount = 0;
            var totalPayable = 0;

            if (ledgers.length > 0) {
                ledgers.forEach((ledger) => {
                    totalBusinessAmount = totalBusinessAmount + parseFloat(ledger.paid);
                    totalPayable = totalPayable + parseFloat(ledger.totalPayable);
                })


                db.execute('UPDATE accounts SET totalbalance = ?, totalPayable = ? WHERE id = ?', [totalBusinessAmount, totalPayable, accountId]).then(([updatedAccount, fieldData]) => {
                    console.log(updatedAccount)
                    res.status(200).json({
                        data: 'Ledger added',
                        success: true
                    });
                })

            } else {
                res.status(200).json({
                    data: 'Ledger added',
                    success: true
                });
            }


        })


    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}

exports.updateById = (req, res, next) => {
    const id = req.params.id;

    const { transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit } = req.body

    db.execute('UPDATE ledgers SET transactionDetail = ? , amount = ?, totalPayable = ? , paid = ?,  remaining = ?, quantity = ?, unit = ?  WHERE id = ?', [transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit, id]).then(([rows, field]) => {
        //! UPDATE ACCOUNTS DATA 

        db.execute('SELECT * FROM ledgers WHERE accountId = ?', [accountId]).then(([ledgers, fieldData]) => {
            var totalBusinessAmount = 0;
            var totalPayable = 0;

            if (ledgers.length > 0) {
                ledgers.forEach((ledger) => {
                    totalBusinessAmount = totalBusinessAmount + parseFloat(ledger.paid);
                    totalPayable = totalPayable + parseFloat(ledger.totalPayable);
                })


                db.execute('UPDATE accounts SET totalbalance = ?, totalPayable = ? WHERE id = ?', [totalBusinessAmount, totalPayable, accountId]).then(([updatedAccount, fieldData]) => {
                    console.log(updatedAccount)
                    res.status(200).json({
                        data: "Ledger Updated",
                        success: true
                    });
                })

            } else {
                res.status(200).json({
                    data: "Ledger Updated",
                    success: true
                });
            }


        })

    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}