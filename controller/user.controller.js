const config = require('../config/auth')
const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class userController {

   async registerUser (req, res) {
        try {

            //membuat user baru 
            const createUsers = await User.create({
                fullname: req.body.fullname,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role
            })
                //memberikan respon bila gagal membuat user baru
                if(!createUsers){
                    return res.status(400).json({
                        message: 'cannot create user'
                    })
                }

            //membuat create cart untuk user baru
            // const createCart = await cart.create({
            //     user_id: createUsers.id
            // })
            //     //respon bila gagal
            //     if(!createCart){
            //         return res.status(400).json({
            //             message: 'cannot create cart'
            //         })
            //     }
                //respon untuk kedua proses berhasil
                return res.status(200).json({
                    message_user_create: 'success create new user',
                    data_new_user: createUsers,
                    // message_cart_create: 'success create new cart',
                    // data_new_cart: createCart
                })

        }

       catch(err) {
            res.status(500).json({
                message: err.message
            })
        }


        
    }
    
    loginUser (req, res) {
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then((User) => {
            //pesan bila email tidak ditemukan
            if(!User){
                res.status(404).json({
                    accesToken: null,
                    message: 'Email not found'
                })
                return
            }
            //membuat fariable validasi password
            let passwordIsValid = bcrypt.compareSync(req.body.password, User.password)
        
            if(!passwordIsValid) {
                return res.status(401).json({
                    accesToken: null,
                    message: 'password is invalid',
                })
            }
            //membuat token dan akan mengirimkannya kedalam respom
            let token = jwt.sign({ id: User.id, role: User.role}, config.secret, {
                expiresIn: 86400, //24 jam
            })
            //respon dari login
            res.status(200).json({
                id: User.id,
                name: User.name,  
                role: User.role,  
                email: User.email,
                accesToken: token,
            })     
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })

    }

    async profileUser(req, res) {
        try{
            //membuat queri untuk menemukan id sesuai dengan yang ada di token
            const userProfile = await User.findOne({
            where: {id: req.userId} 
            })
            if(!userProfile) {
                res.status(404).json({
                    message: 'User not found'
                })
            }
            return res.status(200).json({
                message: `show profile with id: ${req.userId}`,
                data: userProfile
            })
        }
        catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = {
    userController
}