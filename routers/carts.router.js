const { cartController } = require('../controller/cart.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const cartcontroller = new cartController()
const tokenjwt = new tokenJwt()

router.post('/api/cart',tokenjwt.verifyToken, cartcontroller.createCart)
router.post('/api/cart/:id',tokenjwt.verifyToken, cartcontroller.addCart)
router.get('/api/cart',tokenjwt.verifyToken, cartcontroller.showCart)


module.exports = router
