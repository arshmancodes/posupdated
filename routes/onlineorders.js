const express = require('express')
const router = express.Router()
const onlinecontroller= require('../controllers/onlineorderController');


router.get('/', function(req, res) {
    res.send("Welcome to Online Orders routes")
})

router.get('/getAll', onlinecontroller.getAll );
router.post('/addOrder', onlinecontroller.addOrder);

module.exports = router;