const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to the product endpoint"
    });
});

router.post('/upload', productController.uploadProduct);

router.get('/all', productController.getAllProduct);

module.exports = router;