const router = require('express').Router()
module.exports = router
const { User, Orders, Order_Beasts } = require('../db/models')

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
    id,
    {
      include: [{
        model: Orders,
        through: {
          attributes: ['id', 'orderStatus', 'orderDate']
        }
        // include: [
        //   {
        //     model: Order_Beasts,
        //     through: {
        //       attributes: ['quantity', 'beastId']
        //     }
        //   }]
        }]
    })
  .then(user => res.json(user))
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
