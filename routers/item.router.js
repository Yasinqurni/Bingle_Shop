
const { itemController } = require('../controller/item.controller')
const router = require('express').Router()

const itemcontroller = new itemController()

router.post('/api/createitem', itemcontroller.createItem)
router.get('/api/readitem', itemcontroller.readItem)


module.exports = router
