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

module.exports = router;