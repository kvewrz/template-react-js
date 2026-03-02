const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Ad = require('./Ad');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  adId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'ads', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'favorites',
  timestamps: true,
  underscored: true,
});

Favorite.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(Ad, { foreignKey: 'adId' });
Ad.hasMany(Favorite, { foreignKey: 'adId' });

module.exports = Favorite;
