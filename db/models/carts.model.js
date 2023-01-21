const { Model, DataTypes } = require("sequelize")
const sequelize = require("../../config/config.js")

class cart extends Model {
}

cart.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
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

module.exports = cart