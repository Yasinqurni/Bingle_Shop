const { item, cart, item_cart } = require('../db/models')

class cartController {
    async addCart (req, res, next) {
        try {
            //mencari cart yang aktif
            const findCart = await cart.findAll()
            //jika tidak ada maka akan membuat cart
                if(!findCart){
                    cart.create({
                        user_id: req.userId
                    })
                } else {
                    console.log(findCart)
                    //proses selanjutnya akan memasukkan item kedalam tabel item_cart
                    //mencari item
                    const id = req.params.id
                    const findItems = await item.findByPk(id)
                        if (!findItems) {
                            return res.status(404).json({
                                Message: `item not found`
                            })
                        }
                    //membuat item_cart baru
                    const createItemCart = item_cart.create({
                        item_id: id,
                        cart_id: findCart.id
                    })
                    console.log(createItemCart)
                    if (!createItemCart) {
                        return res.status(404).json({
                            Message: `cannot create item_cart`
                        })
                    }
                    //menampilkan data cart
                    const showCart = cart.findAll()
                    if(!showCart) {
                        return res.status(404).json({
                            Message: `cannot create item_cart`
                        })
                    }
                    return res.status(200).json({
                        message: `show cart successfully`,
                        data: showCart
                    })
        
                }

               
        }
        
        catch (err) {
            return res.status(500).json({
                Message: err.message
            })
        }
    }
}

module.exports = {
    cartController
}