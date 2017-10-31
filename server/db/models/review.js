const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    title: {
       type: Sequelize.STRING,
       defaultValue: 'Review'
    },
    content: Sequelize.TEXT,
    image: Sequelize.STRING
  })
  
  module.exports = Review