const express = require('express');
const { Favorite, Ad, Category, User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Ad,
          include: [
            { model: Category, attributes: ['id', 'name'] },
            { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
          ],
        },
      ],
    });
    const ads = favorites.map((f) => f.Ad).filter(Boolean);
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch favorites' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { adId } = req.body;
    if (adId == null || adId === '') {
      return res.status(400).json({ error: 'adId is required' });
    }
    const adIdNum = parseInt(adId, 10);
    if (Number.isNaN(adIdNum)) {
      return res.status(400).json({ error: 'Invalid adId' });
    }
    const ad = await Ad.findByPk(adIdNum);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    const [favorite] = await Favorite.findOrCreate({
      where: { userId: req.user.id, adId: adIdNum },
      defaults: { userId: req.user.id, adId: adIdNum },
    });
    const adWithIncludes = await Ad.findByPk(adIdNum, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: User, as: 'User', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.status(201).json(adWithIncludes);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add to favorites' });
  }
});

router.delete('/:adId', async (req, res) => {
  try {
    const adIdNum = parseInt(req.params.adId, 10);
    if (Number.isNaN(adIdNum)) {
      return res.status(400).json({ error: 'Invalid adId' });
    }
    const deleted = await Favorite.destroy({
      where: { userId: req.user.id, adId: adIdNum },
    });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to remove from favorites' });
  }
});

module.exports = router;
