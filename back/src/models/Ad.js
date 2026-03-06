const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
    onDelete: 'RESTRICT',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'ads',
  timestamps: true,
  underscored: true,
});

Ad.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Ad, { foreignKey: 'userId' });
Ad.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Ad, { foreignKey: 'categoryId' });

module.exports = Ad;
