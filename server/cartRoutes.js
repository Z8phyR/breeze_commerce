const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');
const verifyToken = require('./userRoutes.js').verifyToken;

const { User } = require('../database/database');

// Cart Routes

// Add a product to the cart
router.post('/cart/add', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const product = {
            productId: req.body.productId,
            quantity: req.body.quantity
        };
        user.cart.push(product);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all products in the cart
router.get('/cart', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.cart);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Update a product in the cart
router.put('/cart/update/:productId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const product = user.cart.find(product => product.productId === req.params.productId);
        product.quantity = req.body.quantity;
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Delete a product from the cart
router.delete('/cart/delete/:productId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const updatedCart = user.cart.filter(product => product.productId !== req.params.productId);
        user.cart = updatedCart;
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Empty the cart
router.delete('/cart/delete', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = [];
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Checkout
router.post('/cart/checkout', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const order = {
            userId: req.user._id,
            products: user.cart,
            totalPrice: req.body.totalPrice,
            status: 'Pending'
        };
        user.orders.push(order);
        user.cart = [];
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get all orders
router.get('/orders', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.orders);
    } catch (err) {
        res.json({ message: err });
    }
}
);
