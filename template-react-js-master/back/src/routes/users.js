const express = require('express');
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middleware/auth');
const { User } = require('../models');

const router = express.Router();

function userToResponse(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
  };
}

router.use(authMiddleware);

router.get('/me', async (req, res) => {
  try {
    res.json(userToResponse(req.user));
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch profile' });
  }
});

router.patch('/me', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = req.user;

    if (name !== undefined) user.name = String(name).trim() || null;
    if (phone !== undefined) user.phone = String(phone).trim() || null;

    if (email !== undefined) {
      const trimmed = String(email).trim().toLowerCase();
      if (!trimmed) {
        return res.status(400).json({ error: 'Email cannot be empty' });
      }
      const existing = await User.findOne({ where: { email: trimmed } });
      if (existing && existing.id !== user.id) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      user.email = trimmed;
    }

    if (password !== undefined && password !== '') {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json(userToResponse(user));
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update profile' });
  }
});

module.exports = router;
