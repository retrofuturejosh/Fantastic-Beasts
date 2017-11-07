const router = require('express').Router()
const Order = require('../db/models').Order
module.exports = router

//Find all orders ever, for admin only
router.get('/', (req, res, next) => {
    // will put req.user authorization logic here
    Order.findAll()
        .then(orders => res.json(orders))
        .catch(next)
})

router.get('/:id', (req,res,next) => {
    Order.findById(
        req.params.id,
        {include: [{all: true}]}
    )
        .then(order => res.json(order))
        .catch(next)
})

//this is fine for now, but realistically we're going to want to create an order (Cart) as soon as a user logs in.

router.post('/', (req, res, next) => {
    Order.create(req.body)
        .then(newOrder => res.json(newOrder))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Order.update(req.body,{
        where: {
            id: req.params.id
        }})
        .then(updatedOrder => res.json(updatedOrder))
        .catch(next)
})

router.delete('/:id', (req,res,next) => {
    Order.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(deleted => res.json(deleted))
        .catch(next)
})

// async function sampleFunc(){
//     try { 
//         let users = await User.findAll();
//         //1. cannot user array callback functions. 
//         for(let i = 0; i < users.length; i++){
//             let userReview = await Review.findAll({ where: { userId: users[i].id }});
//         }
//     } catch(err){
//         next(err);
//     }
// }
