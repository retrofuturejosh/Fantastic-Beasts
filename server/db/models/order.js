const Sequelize = require('sequelize');

const db = require('../db')

const Order = db.define('order', {
  isOrdered: {
    type: Sequelize.BOOLEAN
  },
  //do we want status and isOrdered to be different fields?
  sessionId: {
    type: Sequelize.INTEGER
  },
  orderDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order;
