const { Item, Cart, Item_cart } = require('../db/models')

class cartController {
   
    async addCart(req, res) {
        try {
        //status cart {pending,processing,complete}
        //1. menemukan item yang akan dimasukkan ke cart dengan menggunakan id_item
        //2. menemukan cart dengan status item:pending
        //3. bila tidak ditemukan maka akan membuat cart baru dengan status:pending        
        //4. membuat cart_item dengan id cart pending tsb

            //menemukan item
            const id = req.params.id
            
            const findItem = await Item.findByPk(id)
            if (!findItem) {
                return res.status(404).json({
                    message: `item ${id} not found`
                })
            }

            // menemukan cart dengan status item:pending
            let cart = await Cart.findOne({
                attributes: ['id', 'user_id','status_cart'],
                where: { 
                    status_cart: 'pending',
                    user_id: req.userId,
                    }
            })      

            // bila tidak ditemukan maka akan membuat cart baru dengan status:pending
            if(!cart) {
                cart = await Cart.create({
                    user_id: req.userId,
                    status_cart: 'pending'
                })
            } 
            
            const cartId = {}
            cartId[cart.status_cart] = cart.id

            //create item_cart
            const qty = req.body.quantity_order
            const totalprice = qty * findItem.price

            const createItemcart = await Item_cart.create({
                item_id: id,
                cart_id: cartId['pending'],
                quantity_order: qty,
                total_price: totalprice
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
        }
    }

    async showCart(req, res) {
       
        try {
            const findCart = await Cart.findAll({
                attributes: ['id', 'user_id', 'status_cart'],
                include: [
                    {
                        model: Item_cart,
                        attributes: ['id', 'item_id', 'quantity_order', 'total_price'],
                        include: [{
                            model: Item,
                            attributes: ['name_item', 'price'],
                        }]
                    }
                ],
                where: {user_id: req.userId}
            })
            if (!findCart) {
                return res.status(500).json({
                    message: `cart not found`
                })
            }
            
            return res.status(200).json({
                message: `show cart successfully`,
                data: findCart,
                
            })
        }
        catch(err) {
            return res.status(500).json({
                message: err.message
                
            })
        }
        
    }

}

module.exports = {
    cartController
}