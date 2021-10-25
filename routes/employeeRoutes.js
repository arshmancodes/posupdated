const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')

router.get('/', (req, res, next) => {
    res.send('Welcome to employee endpoint')
})

router.post('/add/:branchId', employeeController.add)
router.get('/:branchId', employeeController.getAllEmployees)
router.post('/update/:id', employeeController.updateEmployee)
router.get('/remove/:id', employeeController.removeEmployee)




module.exports = router;