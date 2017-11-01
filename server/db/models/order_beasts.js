const Sequelize = require('sequelize');
const db = require('../db');

const Order_Beasts = db.define('order_beast', {
  fixedPrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  //we can store all prices as ints and mod by 100 when we need the price. cuz math sucks
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order_Beasts;