const User = require('./user');
const Beast = require('./beast');
const Review = require('./review');
const Order = require('./order');
const Order_Beasts = require('./order_beasts');

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

//look up all the user's orders with user.getOrders()
User.hasMany(Order);

//order table will have an order_beasts id
Order.belongsToMany(Beast, { through: Order_Beasts });

//order table will have an order_beasts id
Beast.belongsToMany(Order, { through: Order_Beasts });

//look up all the user's review with user.getReviews()
User.hasMany(Review);

//look up all the beast's reviews with beast.getReviews()
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
