const { Order, Cart, Item_cart } = require('../db/models')

class orderController {
    //
    checkout(req, res) {
    
        try {   //find cart with status_cart pending
            const findCart = Cart.findOne({
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
            let total = 0
            // const priceMapping = {}

            for (let itemCart of findCart) {
                let price = Item_cart.findOne({
                    where: { cart_id: itemCart.id}
                })
                // priceMapping[price.id] = price.total_price
                total = total + price.total_price
            }
            const createOrder = Order.create({
                cart_id: findCart.id,
                status_order: 'pending',
                total_price: total
            })
            if (!createOrder) {
                return res.status(400).json({
                    message: `cannot create order`
                })
            }
            
            return res.status(200).json({
                message: `successful checkout, please confirm your purchase`,
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