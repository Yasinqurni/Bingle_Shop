const { Order, Cart, Item_cart } = require('../db/models')

class orderController {
    //
    async checkout(req, res) {
    
        try {   //find cart with status_cart pending
            const findCart = await Cart.findOne({
                where: { 
                    status_cart: 'pending',
                    user_id: req.userId
                    }
            })
            if(!findCart) {
                return res.status(404).json({
                    message: `cart not found`
                })
            }
            //create order
            
            let itemCart = await Item_cart.findAll({
                where: { cart_id: findCart.id}
              })

            if (itemCart.length === 0) {
                return res.status(404).json({
                    message: 'item_cart not found'
                })
            }

            let cartPrice = {}
            let totalPrice = 0;
            itemCart.forEach((itemCartData) => {
                cartPrice[itemCartData.id] = itemCartData.total_price
                totalPrice = totalPrice + itemCartData.total_price
            })

            const createOrder = await Order.create({
                user_id: findCart.user_id,
                cart_id: findCart.id,
                status_order: 'pending',
                total_price: totalPrice
            })
            if (!createOrder) {
                return res.status(400).json({
                    message: `cannot create order`
                })
            }
            
            return res.status(200).json({
                message: `checkout sucsessfully, next purchase`,
                data: createOrder
            })
        }

        catch(err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = { orderController }