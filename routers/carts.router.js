const { cartController } = require('../controller/cart.controller')
const router = require('express').Router()
const { tokenJwt } = require('../middleware')


const cartcontroller = new cartController()
const tokenjwt = new tokenJwt

router.get('/api/createcart/:id',tokenjwt.verifyToken, cartcontroller.addCart)


module.exports = router
