const { user, item, category } = require('../db/models')

class itemController {

    createItem(req, res) {
        if(!req.body) {
            res.status(400).json({
                message: 'body must be required'
            })
            return
        }
        item.create({
            user_id: req.body.user_id,
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
            include: user
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
}

module.exports = {
    itemController
}