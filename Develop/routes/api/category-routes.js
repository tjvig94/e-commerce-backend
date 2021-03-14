const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    }).then(categoryData => res.status(200).json(categoryData));
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = Category.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    }).then(categoryData => (categoryData) ? res.status(200).json(categoryData) : res.status(404).json({ message: "No category found."}));       
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const newCategory = Category.create({
      category_id: req.body.id,
      category_name: req.body.category_name
    }).then(newCategory => res.status(200).json(newCategory));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedCategory = Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(updatedCategory => (updatedCategory) ? res.status(200).json(updatedCategory) : res.status(404).json({ message: "No category to update."}))
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
