require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const adsRoutes = require('./routes/ads');
const favoritesRoutes = require('./routes/favorites');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('combined'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/ads', adsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/orders', ordersRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
}

start();
