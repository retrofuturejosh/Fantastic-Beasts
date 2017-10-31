const Sequelize = require('sequelize')
const db = require('../db')

const Beast = db.define('beast', {
    species: {
      type: Sequelize.STRING,
      allowNull: false
    },
    attributes: Sequlize.ARRAY(Sequelize.STRING),
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
      type: Sequlize.ARRAY(Sequelize.STRING)
    },
    training: {
      type: Sequelize.ENUM('none', 'slightly', 'moderately', 'very', 'completely'),
      allowNull: false
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: "https://lh6.ggpht.com/orPa7ldnMGUrBNVvO-EBedIIwXDByV_UI8H8-QZtEjU0zsoswiI4WCFDq2uehadCd8SH=h1080"
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    breederInfo: Sequelize.JSON,
    quantity: Sequelize.INTEGER
  })
  
  module.exports = Beast