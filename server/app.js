require('../database/connect');
const express = require('express');
const app = express();

app.use(express.json());

const productsRoutes = require('./productsRoutes');
const usersRoutes = require('./usersRoutes');
const orderRoutes = require('./orderRoutes');
const reviewsRoutes = require('./reviewsRoutes');

app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewsRoutes);


app.get('/', (req, res) => {
  res.send('Hello World');
})


module.exports = app;




// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });
