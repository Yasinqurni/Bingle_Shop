const { orderController } = require('../controller/order.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const ordercontroller = new orderController()
const tokenjwt = new tokenJwt()

//create order
router.post('/api/order',tokenjwt.verifyToken, ordercontroller.checkout)


module.exports = router
