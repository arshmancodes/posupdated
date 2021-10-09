const express = require('express')
const router = express.Router()
const accountsController = require('../controllers/accountsController')

router.get('/', function(req, res) {
    res.send("Welcome to accounts routes")
})


router.get('/all/:branchId', accountsController.getAll)
router.get('/:id', accountsController.getById)
router.post('/add/:branchId', accountsController.addAccount)
router.post('/update/:id', accountsController.updateAccountById)


module.exports = router;