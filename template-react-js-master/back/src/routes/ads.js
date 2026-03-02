const express = require('express');
const { Op } = require('sequelize');
const { Ad, Category, User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { categoryId, minPrice, maxPrice, search, authorId } = req.query;
    const where = {};

    if (categoryId != null && categoryId !== '') {
      where.categoryId = parseInt(categoryId, 10);
      if (Number.isNaN(where.categoryId)) {
        return res.status(400).json({ error: 'Invalid categoryId' });
      }
    }

    if (authorId != null && authorId !== '') {
      where.userId = parseInt(authorId, 10);
      if (Number.isNaN(where.userId)) {
        return res.status(400).json({ error: 'Invalid authorId' });
      }
    }

    if (minPrice != null && minPrice !== '') {
      const val = parseFloat(minPrice);
      if (Number.isNaN(val)) {
        return res.status(400).json({ error: 'Invalid minPrice' });
      }
      where.price = where.price || {};
      where.price[Op.gte] = val;
    }

    if (maxPrice != null && maxPrice !== '') {
      const val = parseFloat(maxPrice);
      if (Number.isNaN(val)) {
        return res.status(400).json({ error: 'Invalid maxPrice' });
      }
      where.price = where.price || {};
      where.price[Op.lte] = val;
    }

    if (search != null && String(search).trim() !== '') {
      const term = `%${String(search).trim()}%`;
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push({
        [Op.or]: [
          { title: { [Op.like]: term } },
          { description: { [Op.like]: term } },
        ],
      });
    }

    const ads = await Ad.findAll({
      where,
      order: [['id', 'ASC']],
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch ads' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
      ],
    });
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch ad' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, categoryId, imageUrl } = req.body;
    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!description || !String(description).trim()) {
      return res.status(400).json({ error: 'Description is required' });
    }
    if (price == null || price === '') {
      return res.status(400).json({ error: 'Price is required' });
    }
    const priceNum = parseFloat(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ error: 'Invalid price' });
    }
    if (categoryId == null || categoryId === '') {
      return res.status(400).json({ error: 'Category is required' });
    }
    const categoryIdNum = parseInt(categoryId, 10);
    if (Number.isNaN(categoryIdNum)) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }
    const cat = await Category.findByPk(categoryIdNum);
    if (!cat) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const ad = await Ad.create({
      userId: req.user.id,
      categoryId: categoryIdNum,
      title: String(title).trim(),
      description: String(description).trim(),
      price: priceNum,
      imageUrl: imageUrl != null ? String(imageUrl).trim() || null : null,
    });
    const created = await Ad.findByPk(ad.id, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create ad' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    if (ad.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own ads' });
    }
    const { title, description, price, categoryId, imageUrl } = req.body;

    if (title !== undefined) {
      if (!String(title).trim()) {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      ad.title = String(title).trim();
    }
    if (description !== undefined) {
      if (!String(description).trim()) {
        return res.status(400).json({ error: 'Description cannot be empty' });
      }
      ad.description = String(description).trim();
    }
    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (Number.isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({ error: 'Invalid price' });
      }
      ad.price = priceNum;
    }
    if (categoryId !== undefined) {
      const catId = parseInt(categoryId, 10);
      if (Number.isNaN(catId)) {
        return res.status(400).json({ error: 'Invalid categoryId' });
      }
      const cat = await Category.findByPk(catId);
      if (!cat) {
        return res.status(400).json({ error: 'Category not found' });
      }
      ad.categoryId = catId;
    }
    if (imageUrl !== undefined) {
      ad.imageUrl = imageUrl != null ? String(imageUrl).trim() || null : null;
    }

    await ad.save();
    const updated = await Ad.findByPk(ad.id, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update ad' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    if (ad.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own ads' });
    }
    await ad.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete ad' });
  }
});

module.exports = router;
