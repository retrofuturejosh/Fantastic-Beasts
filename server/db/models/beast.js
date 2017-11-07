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
    category: {
      type: Sequelize.ENUM('Land', 'Sea', 'Air', 'Fire'),
      allowNull: false
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
      type: Sequelize.STRING
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
      defaultValue: "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
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