const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Product', productSchema);

// Path: database/database.js

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    userId: String,
    products: [{
        productId: String,
        quantity: Number
    }],
    totalPrice: Number
});

module.exports = mongoose.model('Order', orderSchema);

const reviewSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    review: String
});
    
module.exports = mongoose.model('Review', reviewSchema);