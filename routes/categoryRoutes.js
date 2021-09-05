const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to the category endpoint"
    });
});

router.post('/upload', categoryController.uploadCategory);
router.get('/all/:branchid', categoryController.getAllCategory);

router.post('/update/:branchid/:categoryId', categoryController.updateById);

module.exports = router;