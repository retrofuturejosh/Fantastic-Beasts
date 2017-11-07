const router = require('express').Router()
const Order = require('../db/models').Order
const Beast = require('../db/models').Beast
const Order_Beasts = require('../db/models').Order_Beasts
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
    const { orderStatus, orderDate, shippingAddress, creditCardInfo, email, userId, cart } = req.body
    const orderToPost = {
        orderStatus,
        orderDate,
        shippingAddress,
        creditCardInfo,
        email,
        userId
    }
    console.log('our cart is ', cart)
    let beasts = cart.map(item => item.beast)
    let beastQuantityObj = {}
    cart.forEach(item => {
        beastQuantityObj[item.beast.id] = item.quantity
    })
    let newOrderReturn
    console.log('beasts are ', beasts)
    Order.create(orderToPost)
        .then(newOrder => {
            newOrderReturn = newOrder
            return Promise.all(beasts.map(beast => newOrder.addBeast(beast.id)))
        })
        .then(() => {
            return Promise.all(beasts.map(beast => {
                let foundFixedPrice
                let beastInstanceId
                Beast.findById(beast.id)
                .then(beastInstance => {
                    foundFixedPrice = beastInstance.price
                    beastInstanceId = beastInstance.id
                    return Order_Beasts.findOne({where: {orderId: newOrderReturn.id, beastId: beastInstance.id}})
                })
                .then(order_beast => {
                    order_beast.update({fixedPrice: foundFixedPrice, quantity: beastQuantityObj[beastInstanceId]})
                })
            }))
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

