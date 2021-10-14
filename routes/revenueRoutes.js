const express = require('express')
const router = express.Router()
const revenueController = require('../controllers/revenueController')


router.get('/', (req, res, next) => {
    res.json("Welcome to revenue end points")
})

router.get('/all/:branchId', revenueController.getAll)
router.get('/:id', revenueController.getById)

router.post('/add', revenueController.add)



module.exports = router;