const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const RefreshToken = require('./RefreshToken');
const Ad = require('./Ad');
const Favorite = require('./Favorite');
const Order = require('./Order');

module.exports = {
  sequelize,
  User,
  Category,
  RefreshToken,
  Ad,
  Favorite,
  Order,
};
