const { Order, Cart, Item_cart, Item } = require('../db/models')

class orderController {
    
    async checkout(req, res) {
    
        try {   
            //find cart with status_cart pending
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

            //update status cart
            const updateCart = await Cart.update(
                { status_cart: 'process' },
                { where: {id: findCart.id}}
            )

            if(!updateCart) {
                return res.status(400).json({
                    message: `cannot update status cart`
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

    async confirmPayment(req, res) {
        //update order status dari pending menjadi success
        //update cart status dari process menjadi success
        //update stock item 
        try{
            //update order
            const findOrder = await Order.findOne({
                where: {
                    user_id: req.userId,
                    status_order: 'pending'
                    }
            })

            if (!findOrder) {
                return res.status(400).json({
                    message: `cannot find order`
                })
            }
    
            const updateOrder = await Order.update(
                {status_order: 'success'},
                {where: {id: findOrder.id}}
            )
                

            // Update cart
            const findCart = await Cart.findOne({
                where: {
                    status_cart: 'process',
                    user_id: findOrder.user_id
                }
            })
            

            await Cart.update(
                {status_cart: 'success'},
                {where: {id: findCart.id}}
            )
               
                
            //update quantity item
            const itemCart = await Item_cart.findAll({
                where: {cart_id: findCart.id}
            })
            for (const item of itemCart) {
                const findItem = await Item.findOne({
                    where: {id: item.item_id}
                })
                const qty = findItem.quantity - item.quantity_order
                await Item.update(
                    {quantity: qty },
                    {where: {id: item.item_id}}
                )
            }
            return res.status(200).json({
                message: `payment successfully`
            })
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            })
        }


    }

    async cancelOrder(req, res) {
        //find order dengan status pending
        //delete order
        //merubah status cart dari process menjadi pending
        try {
            const findOrder = await Order.findOne({
                where: {
                    status_order: 'pending',
                    user_id: req.userId
                }
            })
                if(!findOrder) {
                    return res.status(404).json({
                        message: 'Order not found'
                    })
                }
            await Order.destroy({
                where: {id: findOrder.id}
            })
    
            const findCart = await Cart.findOne({
                where: {
                    status_cart: 'process',
                    user_id: findOrder.user_id
                }
            })
                if(!findCart) {
                    return res.status(404).json({
                        message: 'cart not found'
                    })
                }
            await Cart.update(
                {status_cart: 'pending'},
                {where: {id: findCart.id}}
            )
    
            return res.status(200).json({
                message: 'cancel order successfully'
            })
        }
        
        catch(err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    
}

module.exports = { orderController }