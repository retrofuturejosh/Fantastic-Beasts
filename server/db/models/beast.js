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
      defaultValue: 'https://pre00.deviantart.net/8c05/th/pre/f/2015/245/c/3/league_of_legends_maokai_render_by_mathiashenr-d984680.png'
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