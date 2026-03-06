const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Ad = require('./Ad');

const Order = sequelize.define('Order', {
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
  adId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'ads', key: 'id' },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: { isIn: [['pending', 'rejected', 'cancelled']] },
  },
  rejectComment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true,
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'Buyer' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(Ad, { foreignKey: 'adId' });
Ad.hasMany(Order, { foreignKey: 'adId' });

module.exports = Order;
