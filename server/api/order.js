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

