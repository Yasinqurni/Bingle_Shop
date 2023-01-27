const { cartController } = require('../controller/cart.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const cartcontroller = new cartController()
const tokenjwt = new tokenJwt

router.get('/api/createcart',tokenjwt.verifyToken, cartcontroller.createCart)
router.get('/api/addcart/:id',tokenjwt.verifyToken, cartcontroller.addCart)
router.get('/api/showcart',tokenjwt.verifyToken, cartcontroller.showCart)


module.exports = router
