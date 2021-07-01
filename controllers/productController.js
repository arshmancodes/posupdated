const db = require('../service/database');
const fs = require('fs');
const path = require("path")

function uploadProductImage(imageFile, dir) {
    var completed = '';
    const staticDir = './images/';

    if (!fs.existsSync(staticDir + 'product')) {
        fs.mkdirSync(staticDir + 'product');
    }

    var matches = imageFile.match(/(.+)$/);
    // console.log(matches[0]);
    response = {};
    response.data = new Buffer.from(matches[1], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let fileName = dir + "." + 'png';

    try {
        fs.writeFileSync(staticDir + 'product' + '/' + fileName, imageBuffer, 'utf8');
        completed = 'product' + '/' + fileName;
    } catch (e) {
        console.log(e);
    }
    return completed;
}


exports.uploadProduct = (req, res, next) => {

    const imageUrl = uploadProductImage(req.body.image, req.body.productName);
    db.execute('INSERT INTO product(name, category, imageUrl, stock, price, ingredients) VALUES (?, ?, ?, ?, ?, ?)', [req.body.productName, req.body.category, imageUrl, req.body.stock, req.body.price, req.body.ingredients]).then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows.insertId,
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });
}

exports.getAllProduct = (req, res, next) => {
    db.execute('SELECT * FROM product').then(([rows, field]) => {
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