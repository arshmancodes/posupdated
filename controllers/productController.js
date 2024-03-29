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
    db.execute('INSERT INTO product(name, category, imageUrl, stock, price, ingredients, unit, size, branchid, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.productName, req.body.category, imageUrl, req.body.stock, req.body.price, req.body.ingredients, req.body.unit, req.body.size, req.body.branchid, req.body.cost]).then(([rows, fieldData]) => {
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
    const branchId = req.params.branchid;
    db.execute('SELECT * FROM product WHERE branchid = ?', [branchId]).then(([rows, field]) => {
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

exports.updateById = (req, res, next) => {
    const branchId = req.params.branchid;
    const productId = req.params.productId;

    var name = req.body.name;
    var category = req.body.category;
    var size = req.body.size;
    var stock = req.body.stock;
    var price = req.body.price;
    var cost = req.body.cost;

    db.execute('UPDATE product SET name = ? , category = ?, size = ?, stock = ?, price = ?, cost = ? WHERE id = ? AND branchid = ?', [name, category, size, stock, price, cost, productId, branchId]).then(([rows, field]) => {
        res.status(200).json({
            data: "Product Updated",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}


exports.deleteById = (req, res, next) => {
    const branchId = req.params.branchid;
    const productId = req.params.productId;


    db.execute('DELETE FROM product WHERE id = ? AND branchid = ?', [productId, branchId]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Product deleted",
            success: true
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    });

}