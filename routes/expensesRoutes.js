const express = require('express')
const router = express.Router()

const expensesController = require('../controllers/expensesController')

router.get('/', (req, res, next) => {
    res.send('Welcome to expenses endpoint')
})

router.post('/add/:branchId', expensesController.add)
router.get('/:branchId', expensesController.getAllExpenses)
router.post('/update/:id', expensesController.updateExpenses)

module.exports = router;