const db = require('../service/database');

exports.getById = (req, res, next) => {
    const id = req.params.id;

    db.execute('SELECT * FROM customers WHERE id = ?', [id]).then(([rows, fieldData]) => {


        if (rows.length > 0) {
            res.status(200).json({
                data: rows[0],
                success: true
            });
        } else {
            res.status(200).json({
                data: "No Such Customer",
                success: false
            });
        }

        res.status(200).json({
            data: err.message,
            success: false
        });

    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })

}