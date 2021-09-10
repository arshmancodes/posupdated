const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

router.get('/', (req, res, next) => {
    res.send('Welcome to transactions routes');
})

router.post('/create/:branchId', transactionController.createTransaction)
router.get('/:branchId', transactionController.getTransactions)



module.exports = router;