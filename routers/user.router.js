
const { userController} = require('../controller/user.controller')
const router = require('express').Router()
const { isUserExist } = require('../middleware')

const usercontroller = new userController()
const isuserexist = new isUserExist()

router.post('/api/register',isuserexist.validate, usercontroller.registerUser )
router.post('/api/login', usercontroller.loginUser )

module.exports = router
