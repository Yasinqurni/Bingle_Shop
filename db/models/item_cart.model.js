const { Model, DataTypes } = require("sequelize")
const sequelize = require("../../config/config.js")

class item_cart extends Model {
}

item_cart.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'item_id'
      },
        cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cart_id'
      },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
)

module.exports = item_cart