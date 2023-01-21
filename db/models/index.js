const user = require('./users.model')
const item = require('./items.model')
const cart = require('./carts.model')
const category = require('./category.model')
const image = require('./images.model')
const order = require('./orders.model')
const item_cart = require('./item_cart.model')
const sequelize = require('sequelize')

user.hasMany(item, {
    as: 'item'
})
item.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
})
user.hasMany(order, {
    as: 'order'
})
order.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
})

item.hasMany(image, {
    as: 'image',
    foreignKey: 'image_id'
})
image.belongsTo(item, {
    as: 'item'
})

item.hasOne(category, {
    as: 'category',
    foreignKey: 'category_id'
})
item.hasMany(item_cart, {
    as: 'item_cart'
})
item_cart.belongsTo(item, {
    as: 'item',
    foreignKey: 'item_id'
})

cart.hasMany(item_cart, {
    as: 'item_cart'
})
item_cart.belongsTo(cart, {
    as: 'cart',
    foreignKey: 'cart_id'
})

order.hasOne(cart, {
    as: 'cart',
    foreignKey: 'cart_id'
})

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