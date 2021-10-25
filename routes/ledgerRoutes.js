const express = require('express')
const router = express.Router()
const ledgersController = require('../controllers/ledgerController')

router.get('/', function(req, res) {
    res.send("Welcome to ledgers routes")
})

router.get('/all/:accountId', ledgersController.getAll)
router.get('/:id', ledgersController.getById)
router.post('/add/:accountId', ledgersController.addLedger)
router.post('/update/:id', ledgersController.addLedger)


module.exports = router;