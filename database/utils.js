const mongoose = require('./connect');
const { Product } = require('./database');

const testProducts = [
  {
    name: 'Eco-friendly Bamboo Toothbrush',
    description: 'A sustainable bamboo toothbrush with biodegradable bristles.',
    price: 3.99,
    quantity: 100,
  },
  {
    name: 'Biodegradable Utensils',
    description: 'A set of biodegradable utensils made from plant-based materials.',
    price: 5.99,
    quantity: 150,
  },
  {
    name: 'Reusable Water Bottle',
    description: 'A reusable water bottle made from recycled plastic.',
    price: 9.99,
    quantity: 50,
  }
];

async function insertTestProducts() {
  try {
    await Product.insertMany(testProducts);
    console.log('Test products inserted successfully!');
  } catch (error) {
    console.error('Error inserting test products:', error);
  }
}

insertTestProducts().then(() => mongoose.disconnect());
