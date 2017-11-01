const Sequelize = require('sequelize');
const db = require('../db');

const Order_Beasts = db.define('order_beast', {
  fixedPrice: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  beastId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order_Beasts;