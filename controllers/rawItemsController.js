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


    const { name, quantity, unit, price } = req.body;

    db.execute('UPDATE rawitems SET name = ? , quantity = ?, unit = ?, price = ? WHERE id = ?', [name, quantity, unit, price, rawitemId]).then(([rows, field]) => {
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