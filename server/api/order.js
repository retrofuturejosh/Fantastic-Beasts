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

router.get('/:id/users', (req,res,next) => {
    Order.findById({
        where: {
            userId: req.params.id
        }
    })
        .then(usersOrder => res.json(usersOrder))
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { orderStatus, orderDate, shippingAddress, creditCardInfo, email, userId, beasts } = req.body
    const orderToPost = {
        orderStatus,
        orderDate,
        shippingAddress,
        creditCardInfo,
        email,
        userId
    }
    Order.create(orderToPost)
        .then(newOrder => {
            beasts.forEach(beast => newOrder.addBeast(beast.id))
            return newOrder
        })
        .then(() => res.status(200).send('SUCCESS!'))
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

