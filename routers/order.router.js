const { orderController } = require('../controller/order.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const ordercontroller = new orderController()
const tokenjwt = new tokenJwt()

//create order
router.post('/api/order',tokenjwt.verifyToken, ordercontroller.checkout)
//konfirmasi pembayaran
router.patch('/api/order',tokenjwt.verifyToken, ordercontroller.confirmPayment)
//cancel order
router.delete('/api/order',tokenjwt.verifyToken, ordercontroller.cancelOrder)


module.exports = router
