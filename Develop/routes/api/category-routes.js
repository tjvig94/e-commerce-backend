const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

const notFound = {
  message: "No category found."
};

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product
    }]
  })
  .then(categoryData => res.status(200).json(categoryData))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ 
      model: Product
    }]
  })
  .then(categoryData => (categoryData) ? res.status(200).json(categoryData) : res.status(404).json(notFound))       
  .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(newCategory => (newCategory) ? res.status(200).json(newCategory) : res.status(404).json(notFound))
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(category => (category) ? res.status(200).json(category) : res.status(404).json(notFound))
  .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(destroyedCategory => (destroyedCategory) ? res.status(200).json(destroyedCategory) : res.status(404).json(notFound))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
