
const { userController} = require('../controller/user.controller')
const router = require('express').Router()
const { isUserExist, tokenJwt  } = require('../middleware')

const usercontroller = new userController()
const isuserexist = new isUserExist()
const tokenjwt = new tokenJwt()

router.post('/api/register',isuserexist.validate, usercontroller.registerUser )
router.post('/api/login', usercontroller.loginUser )
router.get('/api/profile',tokenjwt.verifyToken, usercontroller.profileUser)

module.exports = router
