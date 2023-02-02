const { Item, Image } = require('../db/models')
const errorHelper = require('../respon-helper/error.helper')
const response = require('../respon-helper/response.helper')

class itemController {

    async createItem(req, res, next) {
        try {
            if(!req.body) {
                res.status(400).json({
                    message: 'body must be required'
                })
                
            }
            const create = await Item.create({
                user_id: req.userId,
                name_item: req.body.name_item,
                category_id: req.body.category_id,
                price: req.body.price,
                quantity: req.body.quantity
            })
            return new response(res, 200, create)
        }
        
        catch(error) {
           next(error)
        }
    }

    async readItem (req, res, next) {

        try {
            const findItem = await Item.findAll({
                include: Image
            }) 
            
            if(!findItem) {
                throw new errorHelper (404, "Item not found")
            }
            
            return new response(res, 200, findItem)
        }
        
        catch(error) {
            next(error)
        }
    }

    async readItemById (req, res, next) {

        try {
            const id = req.params.id
            const findItemByPk = await Item.findByPk(id) 
            if(!findItemByPk) {
                throw new errorHelper(404, 'item not found')
            }
            return new response(res, 200, findItemByPk)
        }
        
        catch(error) {
            next(error)
        }
    }

    async deleteItem (req, res, next) {

        try {
            const id = req.params.id
            const findItem = await Item.findOne({
                where: {
                    user_id: req.userId,
                    id: req.params.id
                }
            })
                if(!findItem) {
                    throw new errorHelper(404, 'item not found')
                }
            const deleteItem =  await Item.destroy({
                where: {id: findItem.id}
            })
                if (!deleteItem) {
                    throw new errorHelper(400, 'cannot delete item')
                }

            return new response (res,200, `delete item by ${id} sucsessfully`)
                
        }
        
        catch(error) {
            next(error)
        }

    }

    async updateItem (req, res, next) {
        
        try {
            const id = req.params.id
            const findItem = await Item.findOne({
                where: {
                    user_id: req.userId,
                    id: req.params.id
                }
            })
                if(!findItem) {
                    throw new errorHelper(404, 'item not found')
                }
        
            const updateItem = await Item.update(req.body, {
                where: {id: findItem.id}
            })
            if(!updateItem) {
                throw new errorHelper(400, `cannot update item with id ${id}`)
            }
            
            return new response(res, 200, 'update item successfully')
            
        }
        catch(error) {
            next(error)
        }
    }
}

module.exports = {
    itemController,
}