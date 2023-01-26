const { user, item, category, image } = require('../db/models')

class itemController {

    createItem(req, res) {
        if(!req.body) {
            res.status(400).json({
                message: 'body must be required'
            })
            return
        }
        item.create({
            user_id: req.userId,
            name_item: req.body.name_item,
            category_id: req.body.category_id,
            price: req.body.price,
            quantity: req.body.quantity
        })
        .then((result) => {
            res.status(201).json({
            data: result,
            message: 'Item created successfully'
            })
        })
        .catch((err) => {
            res.status(500).json({
            message: err.message
            })
        })
    }

    readItem (req, res) {

        item.findAll({
            include: image
        }) 
    
        .then((result) => {
            res.status(200).json({
                message: 'show all items successfully',
                data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    async readItemById (req, res) {

        const id = req.params.id
        item.findByPk(id) 
        .then((result) => {
                res.status(200).json({
                    data: result,
                    message: `show item with id: ${id}`,
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    }

    deleteItem (req, res) {

        const id = req.params.id
        
        item.destroy({
            where: {id: id}
        })
        .then((num) => {
            if (num == 1) {
            res.status(200).json({
                message:  `delete item by id: ${id} successfully`,
                })
            }else {
            res.status(404).json({
                message:  `item with id: ${id} not found`,
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })

    }

    updateItem (req, res) {
        
        const id = req.params.id
        
        item.update(req.body, {
            where: {
                id: id
            }
        }).then((result) => {
            if (result == 1) {
                res.status(200).json({
                    message: `update item id: ${id} is successfully`
                })
            }else {
                res.status(404).json({
                    message: `id: ${id} not found`
                })
            }
            
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    }
}

module.exports = {
    itemController,
}