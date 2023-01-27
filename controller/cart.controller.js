const { item, cart, item_cart } = require('../db/models')

class cartController {
    async createCart (req, res) {
        try {
            //membuat create cart baru
            const createCart = await cart.create({
                user_id: req.userId
            })
                //respon bila gagal
                if(!createCart){
                    return res.status(400).json({
                        message: 'cannot create cart'
                    })
                }
                //respon untuk kedua proses berhasil
                return res.status(200).json({
                    message: 'success create new cart',
                    data: createCart
                })               
        }
        
        catch (err) {
            return res.status(500).json({
                Message: err.message
            })
        }
    }

    async addCart(req, res) {
        try {
            //menemukan item
            const id = req.params.id
            const findItem = await item.findByPk(id)
            if (!findItem) {
                return res.status(404).json({
                    message: `item ${id} not found`
                })
            }
            // return res.status(200).json({
            //         message: `find item successfully`,
            //         data: findItem
            //     })

            //menemukan cart
            const findCart = await cart.findOne({
                where: { user_id: req.userId }
            })
            if (!findCart) {
                return res.status(404).json({
                    message: `cart not found, please create  new cart`
                })
            }
            // return res.status(200).json({
            //     message: `find cart successfully`,
            //     data: findCart
            // })

            //create item_cart
            const createItemcart = await item_cart.create({
                item_id: findItem.id,
                cart_id: findCart.id,
            })
            if (!createItemcart) {
                return res.status(404).json({
                    message: `cannot create item_cart`
                })
            }
            return res.status(200).json({
                message: `created item_cart`,
                data: createItemcart
            })
        }
        catch (err) {
            res.status(500).json({
                message: err.message,
            })
            // console.error(err)
        }
    }

    async showCart(req, res) {
       
        try {
            const findCart = await cart.findAll({
                include: [
                    {
                        model: item_cart,
                        include: [
                            item
                    ]}
                ]
            })
            if (!findCart) {
                return res.status(500).json({
                    message: `cannot find cart`
                })
            }
            
            return res.status(200).json({
                data: findCart,
                message: `show all cart successfully`
            })
        }
        catch(err) {

        }
        
    }

    async deleteCart(req, res) {

    }
}

module.exports = {
    cartController
}