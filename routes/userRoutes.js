const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to the user endpoint"
    });
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/fcmtoken/:id', userController.addFcmToken);

module.exports = router;