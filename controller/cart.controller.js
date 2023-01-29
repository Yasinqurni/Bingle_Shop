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
        //status cart {pending,processing,complete}
        //1. menemukan item yang akan dimasukkan ke cart dengan menggunakan id_item
        //2. menemukan cart dengan status item:pending
        //3. bila tidak ditemukan maka akan membuat cart baru dengan status:pending        
        //4. membuat cart_item dengan id cart pending tsb

            //menemukan item
            const id = req.params.id
            const findItem = await item.findByPk(id)
            if (!findItem) {
                return res.status(404).json({
                    message: `item ${id} not found`
                })
            }

            //menemukan cart dengan status item:pending
            const findCart = await cart.findOne({
                attributes: ['id', 'user_id','status_cart'],
                where: { status_cart: 'pending' }
            })

            // bila tidak ditemukan maka akan membuat cart baru dengan status:pending
            if(!findCart) {
                const createCart = await cart.create({
                    user_id: req.userId,
                    status_cart: 'pending'
                })
                return createCart
            }

            //create item_cart
            const createItemcart = await item_cart.create({
                item_id: req.body, //toString(findItem.id),
                cart_id: req.body, //toString(findCart.id) || toString(createCart.id),
                quantity_order: req.body,
                total_price: req.body
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
            console.log(err)
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
                message: `show all cart successfully`,
                data: findCart,
                
            })
        }
        catch(err) {

        }
        
    }

}

module.exports = {
    cartController
}