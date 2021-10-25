const express = require('express')
const router = express.Router()
const rawitemsController = require('../controllers/rawItemsController')


router.get('/', function(req, res) {
    res.json({ message: 'Welcome to rawitems routes' })
})

router.get('/all/:branchId', rawitemsController.getAll)
router.post('/add/:branchId', rawitemsController.addRawItem)
router.post('/update/:id', rawitemsController.updateRawItemsById)
router.post('/delete/:id', rawitemsController.deleteRawItem)




module.exports = router;