const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to the auth endpoint"
    });
});

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/:id', authController.getUserById);

router.get('/balance/:id', authController.getBalanceById);

module.exports = router;