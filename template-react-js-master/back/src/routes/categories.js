const express = require('express');
const { Category } = require('../models');
const { authMiddleware, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);
router.use(requireAdmin);

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch categories' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch category' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const category = await Category.create({ name: String(name).trim() });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create category' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const { name } = req.body;
    if (name !== undefined) {
      if (!String(name).trim()) {
        return res.status(400).json({ error: 'Name cannot be empty' });
      }
      category.name = String(name).trim();
    }
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete category' });
  }
});

module.exports = router;
