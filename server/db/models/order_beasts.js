const Sequelize = require('sequelize');
const db = require('../db');

const Order_Beasts = db.define('order_beast', {
  fixedPrice: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  //we can store all prices as ints and mod by 100 when we need the price. cuz math sucks
  quantity: {
    type: Sequelize.INTEGER
  },
  //maybe some validations here. 
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // beastId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
  //DONT HARD CODE THESE WE NEED THE ASSOCIATIONS FOR THE METHODS.
})

module.exports = Order_Beasts;