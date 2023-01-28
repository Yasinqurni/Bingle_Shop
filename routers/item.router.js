
const { itemController } = require('../controller/item.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const itemcontroller = new itemController()
const tokenjwt = new tokenJwt

//Create Item Endpoint
router.post('/api/item',tokenjwt.verifyToken, itemcontroller.createItem)
//read Item Endpoint
router.get('/api/item', itemcontroller.readItem)
//read Item by id Endpoint
router.get('/api/item/:id', itemcontroller.readItemById)
//delete Item Endpoint
router.delete('/api/item/:id', itemcontroller.deleteItem)
//update Item Endpoint
router.patch('/api/item/:id',tokenjwt.verifyToken, itemcontroller.updateItem)


module.exports = router
