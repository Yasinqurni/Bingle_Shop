const { item, item_cart } = require('../db/models')

class itemCek {

    itemStok = (req, res, next) => {
        //find item by req.params.id table item
        //cek stock dari item (quantity)
        // membuat perandingan antara item.quantity dan req.body.quantity_item dari table cart_item
        //if item.quantity < req.body.quantity_item maka return cannot order becouse the stock item is ()
        // else item.quantity > req.body.quantity_item maka next
            const findItem = 
    
        }
}
