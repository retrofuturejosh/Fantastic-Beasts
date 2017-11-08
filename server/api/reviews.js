const router = require('express').Router();
module.exports = router;
const Review = require('../db/models').Review;

router.get('/', (req, res, next) => {
  Review.findAll({})
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.findOrCreate({ where: req.body })
    .spread((review, _) => res.json(review))
    .catch(next)
})

// NOT TESTED
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Review.findById(id)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next)
});

// NOT TESTED
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Review.findById(id)
    .then(review => review.destroy())
    .then(() => res.json({ message: 'Deleted Review Successful' }))
    .catch(next)
});
