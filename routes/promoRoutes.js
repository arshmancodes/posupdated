const express = require('express');
const router = express.Router();

const promoController = require('../controllers/promoController');


router.get('/', (req, res, next) => {
    res.send('Welcome to promo end points')
})


router.post('/create', promoController.createPromo)
router.get('/all', promoController.getAllPromo)
router.post('/update/:id', promoController.updatePromo)
router.post('/delete/:id', promoController.deletePromo)


router.get('/check/:code', promoController.checkPromo)

module.exports = router;