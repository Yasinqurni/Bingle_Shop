const { Model, DataTypes } = require("sequelize")
const sequelize = require("../../config/config.js")

class category extends Model {
}

category.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
    }, 
        category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    // deletedAt: 'deleted_at',
    // updatedAt: 'updated_at',
    // createdAt: 'created_at',
  },
)

module.exports = category