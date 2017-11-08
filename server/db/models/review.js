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
    imageUrl: Sequelize.STRING
    //we actually should specify always that an image is act an image_url or imageUrl.
  })
  
  module.exports = Review