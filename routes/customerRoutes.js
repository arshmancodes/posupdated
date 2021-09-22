const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

router.get('/', (req, res, next) => {
    res.send('Welcome to Users routes');
})


router.get('/:id', customerController.getById)
router.get('/phone/:phone', customerController.getByPhone)
router.get('/all/:phone', customerController.getAllByPhone)


module.exports = router;