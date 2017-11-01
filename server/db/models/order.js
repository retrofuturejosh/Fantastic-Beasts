const Sequelize = require('sequelize');

const db = require('../db')

const Order = db.define('order', {
  isOrdered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  sessionId: {
    type: Sequelize.INTEGER
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: null
  }
})

module.exports = Order;
