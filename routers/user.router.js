
const { usercontroller} = require('../controller/user.controller')
const router = require('express').Router()

const userController = new usercontroller()

router.post('/api/register', userController.registerUser )

module.exports = router
