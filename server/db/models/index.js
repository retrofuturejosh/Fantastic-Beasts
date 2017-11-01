const User = require('./user');
const Beast = require('./beast');
const Review = require('./review');
const Order = require('./order');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

 //order table has user Id
Order.belongsTo(User);

//association table to look up all users orders
User.hasMany(Order);

//'cart' table has an order id
Order_Beasts.belongsTo(Order)

//'cart' has beast id
Order_Beasts.belongsTo(Beast);

//order table will have an order_beasts id
Order.belongsTo(Order_Beasts);

//association table of all the user's reviews
User.hasMany(Review);

//association table of all the beast's reviews
Beast.hasMany(Review);

//review table has an author id from user id
Review.belongsTo(User, {as: 'author'});

//review table has a reviewee id from beast id
Review.belongsTo(Beast, {as: 'reviewee'});


module.exports = {
  User,
  Beast,
  Review,
  Order,
  Order_Beasts
}
