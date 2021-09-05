const db = require('../service/database');

exports.createPromo = (req, res, next) => {

    db.execute('INSERT INTO promo(code, status, percent, used) VALUES (?, ?, ?, ? )', [req.body.code, req.body.status, req.body.percent, 0]).then(([rows, fieldData]) => {
        res.status(200).json({
            id: rows.insertId,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}



exports.getAllPromo = (req, res, next) => {

    db.execute('SELECT * FROM promo').then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}



exports.updatePromo = (req, res, next) => {

    const id = req.params.id;

    db.execute('UPDATE promo SET code = ?, status = ?, percent = ? WHERE id = ?', [req.body.code, req.body.status, req.body.percent, id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Promo code updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.deletePromo = (req, res, next) => {

    const id = req.params.id;

    db.execute('DELETE FROM promo WHERE id = ?', [id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Promo code deleted",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}


exports.checkPromo = (req, res, next) => {
    const code = req.params.code;

    db.execute('SELECT * FROM promo WHERE code = ?', [code]).then(([rows, fieldData]) => {

        if (rows.length > 0) {
            res.status(200).json({
                valid: true,
                data: rows[0],
                success: true
            });
        } else {
            res.status(404).json({
                valid: false,
                success: true
            });
        }

    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}