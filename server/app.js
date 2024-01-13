require('../database/connect');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const winston = require('winston');
const expressWinston = require('express-winston');


const  { createHandler } = require('graphql-http/lib/use/express')
const schema = require('./schema');
const resolvers = require('./resolvers');


// Read the SSL certificate files
const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();

// Log all requests to the console and to a file
app.use(expressWinston.logger({
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.combine(
    //     winston.format.colorize(),
    //     winston.format.simple()
    //   )
    // }),
    new winston.transports.File({ 
      filename: 'server/server.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint() // Pretty print for file logs
      )
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  expressFormat: true, // Use the default Express/morgan request formatting
  colorize: false,
  ignoreRoute: function (req, res) { return false; } // Log all routes
}));



app.use(cors(
  {
    origin: 'http://localhost:4200',
    credentials: true
  }
));
app.use(express.json());

const productsRoutes = require('./productsRoutes');
const usersRoutes = require('./usersRoutes');
const orderRoutes = require('./orderRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const cartRoutes = require('./cartRoutes');



app.all('/graphql', createHandler({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
})


module.exports = app;


const httpsServer = https.createServer(credentials, app);

// Start the server
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
httpsServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
