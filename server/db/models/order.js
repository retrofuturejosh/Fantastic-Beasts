const Sequelize = require('sequelize');

const db = require('../db')

const Order = db.define('order', {
  isOrdered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  //do we want status and isOrdered to be different fields?
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  creditCardInfo: {
    type: Sequelize.STRING,
    validate: {
      isCreditCard: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order;
