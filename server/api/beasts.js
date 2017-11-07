const router = require('express').Router();
module.exports = router;
const Beast = require('../db/models').Beast;

//beasts are products so who should be able to update them or create them??? 


router.get('/', (req, res, next) => {
  Beast.findAll({})
    .then(beasts => res.json(beasts))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Beast.findById(id)
    .then(beast => res.json(beast))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Beast.findOrCreate({ where: req.body })
    .spread((beast, _) => res.json(beast))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  if(req.user && req.user.isAdmin === true){
    const { id } = req.params;
    Beast.findById(id)
      .then(beast => beast.update(req.body))
      .then(updatedBeast => res.json(updatedBeast))
      .catch(next)
  } else {
    res.status(401).send('You are unauthorized!!');
  }

});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Beast.findById(id)
    .then(beast => beast.destroy())
    .then(() => res.json({ message: 'Delete Successful' }))
    .catch(next)
});


