const express = require('express');
const { Order, Ad, User, Category } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { asSeller } = req.query;
    const where = {};
    if (asSeller === 'true' || asSeller === true) {
      const myAdIds = (await Ad.findAll({ where: { userId: req.user.id }, attributes: ['id'] })).map((a) => a.id);
      if (myAdIds.length === 0) {
        return res.json([]);
      }
      where.adId = myAdIds;
    } else {
      where.userId = req.user.id;
    }
    const orders = await Order.findAll({
      where,
      order: [['id', 'DESC']],
      include: [
        { model: Ad, include: [{ model: Category, attributes: ['id', 'name'] }, { model: User, as: 'User', attributes: ['id', 'email', 'name'] }] },
        { model: User, as: 'Buyer', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch orders' });
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
    if (ad.userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot order your own ad' });
    }
    const order = await Order.create({
      userId: req.user.id,
      adId: adIdNum,
      status: 'pending',
    });
    const created = await Order.findByPk(order.id, {
      include: [
        { model: Ad, include: [{ model: Category, attributes: ['id', 'name'] }, { model: User, as: 'User', attributes: ['id', 'email', 'name'] }] },
        { model: User, as: 'Buyer', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create order' });
  }
});

router.patch('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only cancel your own orders' });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending orders can be cancelled' });
    }
    order.status = 'cancelled';
    await order.save();
    const updated = await Order.findByPk(order.id, {
      include: [
        { model: Ad, include: [{ model: Category, attributes: ['id', 'name'] }, { model: User, as: 'User', attributes: ['id', 'email', 'name'] }] },
        { model: User, as: 'Buyer', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to cancel order' });
  }
});

router.patch('/:id/reject', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [{ model: Ad }] });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.Ad.userId !== req.user.id) {
      return res.status(403).json({ error: 'Only the ad author can reject this order' });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending orders can be rejected' });
    }
    const { rejectComment } = req.body;
    order.status = 'rejected';
    order.rejectComment = rejectComment != null ? String(rejectComment).trim() || null : null;
    await order.save();
    const updated = await Order.findByPk(order.id, {
      include: [
        { model: Ad, include: [{ model: Category, attributes: ['id', 'name'] }, { model: User, as: 'User', attributes: ['id', 'email', 'name'] }] },
        { model: User, as: 'Buyer', attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to reject order' });
  }
});

module.exports = router;
