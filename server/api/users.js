const router = require('express').Router()
module.exports = router
const { User, Order, Order_Beasts, Review, Beast } = require('../db/models')

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(
    Number(id),
    {
      attributes: ['firstName', 'lastName', 'id'],
      include: [
        {
          model: Order,
          attributes: ['id', 'orderStatus', 'orderDate'],
          include: [
            {
              model: Beast,
              through: {
                model: Order_Beasts,
                attributes: ['fixedPrice', 'quantity'] }
            }
          ]
        },
        { model: Review,
          include: [
            {
              model: Beast,
              as: 'reviewee',
              attributes: ['species']
            }
          ]
        }
      ]
    }
  )
    .then(usersOrders => {
      res.json(usersOrders)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.findOrCreate({ where: req.body })
    .spread((user, _) => res.json(user))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => user.destroy())
    .then(() => res.json({ message: 'Delete Successful' }))
    .catch(next)
});
