const db = require('../service/database');

exports.getAll = (req, res, next) => {
    const branchId = req.params.branchId

    db.execute('SELECT * FROM rawitems WHERE branchid = ?', [branchId]).then(([rows, fieldData]) => {
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


exports.addRawItem = (req, res, next) => {
    const branchId = req.params.branchId
    const { name, quantity, unit, price } = req.body

    db.execute('INSERT INTO rawitems (name, quantity, unit, price, branchid) VALUES (?, ?, ? ,? , ?)', [name, quantity, unit, price, branchId]).then(([rows, field]) => {
        res.status(200).json({
            data: 'Raw Item added',
            success: true
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}


exports.updateRawItemsById = (req, res, next) => {
    const rawitemId = req.params.id;


    const { name, quantity, unit, amount, paid, date, accountId } = req.body;


    db.execute('UPDATE rawitems SET quantity = ? WHERE id = ?', [quantity, rawitemId]).then(([rows, field]) => {

        db.execute("INSERT INTO ledgers (accountId, transactionDetail, amount, totalPayable, paid, remaining, date, quantity, unit) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?)", [accountId, name, amount, amount - paid, paid, amount - paid, date, quantity, unit]).then(([rows, fieldData]) => {

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
                            data: 'RawItem Updated',
                            success: true
                        });
                    })

                } else {
                    res.status(200).json({
                        data: 'RawItem Updated',
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


        res.status(200).json({
            data: "Raw Item Updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}

exports.deleteRawItem = (req, res, next) => {
    const rawitemId = req.params.id;


    db.execute('DELETE FROM rawitems WHERE id = ?', [rawitemId]).then(([rows, field]) => {
        res.status(200).json({
            data: "Raw Item Deleted",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}