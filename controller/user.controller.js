const config = require('../config/auth')
const { user } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class usercontroller {

    registerUser (req, res, next) {
        user.create({
            fullname: req.body.fullname,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        }).then((user) => {
            res.status(201).json({
                message: 'user was created successfully',
                ...user
            })
        }).catch((err)=>{
            res.status(500).json({
                message: err.message,
            })
        })
    }

}

module.exports = {
    usercontroller
}