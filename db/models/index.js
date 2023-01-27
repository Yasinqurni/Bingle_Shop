const user = require('./users.model')
const item = require('./items.model')
const cart = require('./carts.model')
const category = require('./category.model')
const image = require('./images.model')
const order = require('./orders.model')
const item_cart = require('./item_cart.model')
const sequelize = require('sequelize')


item.belongsTo(user, {
    foreignKey: 'user_id'
})

order.belongsTo(user, {
    foreignKey: 'user_id'
})

//relasi asli
image.belongsTo(item, {
    foreignKey: 'item_id'
})
// untuk menampikan data image didalam item
item.hasMany(image, {
    foreignKey: 'item_id'
})

item.belongsTo(category, {
    foreignKey: 'category_id'
})

item_cart.belongsTo(item, {
    foreignKey: 'item_id'
})

item.hasMany(item_cart, {
    foreignKey: 'item_id'
})

item_cart.belongsTo(cart, {
    foreignKey: 'cart_id'
})

cart.hasMany(item_cart, {
    foreignKey: 'cart_id'
})

cart.belongsToMany(item, {through: item_cart})
item.belongsToMany(cart, {through: item_cart})
// order.hasOne(cart, {
//     foreignKey: 'cart_id'
// })


module.exports = {
    user,
    item,
    cart,
    category,
    image,
    order,
    item_cart,
    sequelize
}