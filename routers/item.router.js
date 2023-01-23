
const { itemController } = require('../controller/item.controller')
const router = require('express').Router()

const itemcontroller = new itemController()

router.post('/api/createitem', itemcontroller.createItem)
router.get('/api/item', itemcontroller.readItem)
router.get('/api/item/:id', itemcontroller.readItemById)
router.get('/api/item/:id/delete', itemcontroller.deleteItem)


module.exports = router
