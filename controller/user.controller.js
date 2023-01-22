const e = require('express')
const config = require('../config/auth')
const { user } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class userController {

    registerUser (req, res) {
        
        user.create({
            fullname: req.body.fullname,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        })
        .then((result) => {
            res.status(201).json({
                message: 'user was created successfully',
                ...result
            })
        }).catch((err)=>{
            res.status(500).json({
                message: err.message,
            })
        })


        
    }
    
    loginUser (req, res) {
        user.findOne({
            where:{
                email: req.body.email
            }
        })
        .then((user) => {

            if(!user){
                res.status(404).json({
                    accesToken: null,
                    message: 'Email not found'
                })
                return
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        
            if(!passwordIsValid) {
                return res.status(401).json({
                    accesToken: null,
                    message: 'password is invalid',
                })
            }
            
            let token = jwt.sign({ id: user.id, role: user.role}, config.secret, {
                expiresIn: 86400, //24 jam
            })

            res.status(200).json({
                id: user.id,
                name: user.name,  
                role: user.role,  
                email: user.email,
                accesToken: token,
            })     
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })

    }

}

module.exports = {
    userController
}