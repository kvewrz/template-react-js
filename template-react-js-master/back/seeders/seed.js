require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User, Category, Ad, sequelize } = require('../src/models');

async function seed() {
  try {
    await sequelize.authenticate();

    const [admin] = await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        name: 'Admin',
      },
    });

    const [user] = await User.findOrCreate({
      where: { email: 'user@example.com' },
      defaults: {
        password: await bcrypt.hash('user123', 10),
        role: 'user',
        name: 'Test User',
      },
    });

    const [cat1] = await Category.findOrCreate({
      where: { name: 'Электроника' },
      defaults: { name: 'Электроника' },
    });

    const [cat2] = await Category.findOrCreate({
      where: { name: 'Одежда' },
      defaults: { name: 'Одежда' },
    });

    await Ad.findOrCreate({
      where: { title: 'Телефон', userId: user.id },
      defaults: {
        userId: user.id,
        categoryId: cat1.id,
        title: 'Телефон',
        description: 'Смартфон в хорошем состоянии',
        price: 15000,
      },
    });

    console.log('Seed completed.');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
