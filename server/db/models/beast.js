const Sequelize = require('sequelize')
const db = require('../db')

const Beast = db.define('beast', {
    species: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    characteristics: {
      type: Sequelize.ENUM('Land', 'Sea', 'Air', 'Fire')
    },
    //maybe a better way to think about categories separately.
    danger: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    },
    friendliness: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 10
      }
    },
    size: {
      type: Sequelize.ENUM('extra small', 'small', 'medium', 'large', 'extra large', 'gargantuan'),
      allowNull: false
    },
    careRequirements: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    training: {
      type: Sequelize.ENUM('none', 'slightly', 'moderately', 'very', 'completely'),
      allowNull: false
    },
    origin: {
      type: Sequelize.STRING,
      defaultValue: 'USA'
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: "https://lh6.ggpht.com/orPa7ldnMGUrBNVvO-EBedIIwXDByV_UI8H8-QZtEjU0zsoswiI4WCFDq2uehadCd8SH=h1080"
    },
    //imageUrl
    price: {
      type: Sequelize.INTEGER,
      defaultValue: 1000
    },
    //make int
    breederInfo: Sequelize.JSON,
    //use JSONB it's more versatile.
    quantity: Sequelize.INTEGER
    //what else should we know about quantity.
    //so maybe we should care about this number?
  })
  
  module.exports = Beast