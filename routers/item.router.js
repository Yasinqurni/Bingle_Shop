
const { itemController } = require('../controller/item.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const itemcontroller = new itemController()
const tokenjwt = new tokenJwt

router.post('/api/createitem',tokenjwt.verifyToken, itemcontroller.createItem)
router.get('/api/item', itemcontroller.readItem)
router.get('/api/item/:id', itemcontroller.readItemById)
router.get('/api/item/:id/delete', itemcontroller.deleteItem)
router.patch('/api/item/update/:id', itemcontroller.updateItem)


module.exports = router
