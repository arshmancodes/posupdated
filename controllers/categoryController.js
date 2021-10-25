const db = require('../service/database');
const fs = require('fs');
const path = require("path")

function uploadCategoryImage(imageFile, dir) {
    var completed = '';
    const staticDir = './images/';

    if (!fs.existsSync(staticDir + 'category')) {
        fs.mkdirSync(staticDir + 'category');
    }

    var matches = imageFile.match(/(.+)$/);
    // console.log(matches[0]);
    response = {};
    response.data = new Buffer.from(matches[1], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let fileName = dir + "." + 'png';

    try {
        fs.writeFileSync(staticDir + 'category' + '/' + fileName, imageBuffer, 'utf8');
        completed = 'category' + '/' + fileName;
    } catch (e) {
        console.log(e);
    }
    return completed;
}


exports.uploadCategory = (req, res, next) => {
    const imageUrl = uploadCategoryImage(req.body.image, req.body.categoryName);
    db.execute('INSERT INTO category(name, imageUrl, branchid) VALUES (?, ?, ?)', [req.body.categoryName, imageUrl, req.body.branchid]).then(([rows, fieldData]) => {
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

exports.getAllCategory = (req, res, next) => {
    const branchId = req.params.branchid;
    db.execute('SELECT * FROM category WHERE branchid = ?', [branchId]).then(([category, field]) => {
        db.execute("SELECT * FROM product WHERE branchid = ?", [branchId]).then(([product, field]) => {

            let completeArray = [];
            let prodsArray = []

            category.forEach((categ) => {

                let map = {
                    "category": categ,
                    'products': []
                }
                product.forEach((prod) => {

                    if (categ.name === prod.category) {
                        prodsArray.push(prod)
                        map['products'] = prodsArray
                    }
                })
                completeArray.push(map)
                prodsArray = []
            })



            res.status(200).json(completeArray);

        }).catch((err) => {
            res.status(500).json({
                message: err.message + "(Product ISSUE)",
                success: false
            });
        })

    }).catch((err) => {
        res.status(500).json({
            message: err.message + "(Category ISSUE)",
            success: false
        });
    })
}


exports.updateById = (req, res, next) => {
    const branchId = req.params.branchid;
    const categoryId = req.params.categoryId;
    const oldCat = req.body.oldCat;
    const categoryName = req.body.category;

    db.execute('UPDATE category SET name = ?  WHERE id = ?', [categoryName, categoryId]).then(([rows, field]) => {


        db.execute('UPDATE product SET category = ?  WHERE category = ? AND branchid = ? ', [categoryName, oldCat, branchId]).then(([rows, field]) => {

            res.status(200).json({
                data: "Category Updated",
                success: true
            });

        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false
            });
        })




    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}


exports.deleteById = (req, res, next) => {
    const branchId = req.params.branchid;
    const categoryId = req.params.categoryId;

    const catName = req.body.name;


    db.execute('DELETE FROM category WHERE id = ? AND branchid = ? ', [categoryId, branchId]).then(([rows, field]) => {

        db.execute('DELETE FROM product WHERE category = ? AND branchid = ? ', [catName, branchId]).then(([rows, field]) => {

            res.status(200).json({
                data: "Category Deleted",
                success: true
            });

        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false
            });
        })

    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
}