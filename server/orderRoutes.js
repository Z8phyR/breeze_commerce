const express = require('express');
const { Order } = require('../database/database');
const router = express.Router();
const { verifyToken } = require("./usersRoutes"); // Import the verifyToken function

// GET all orders
router.get('/', verifyToken , async (req, res) => {
    const userId = req.user._id;

    try {
        // find orders that belong to the user
        const orders = await Order.find({userId: userId});
        // const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET a specific order by id
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST a new order
router.post('/post',verifyToken, async (req, res) => {
    const userId = req.user._id;
    console.log("USER ID: ", userId);
    const products = req.body.products;
    console.log("PRODUCTS: ", products);
    
    const order = new Order({
        userId: userId,
        products: products,
        totalPrice: req.body.totalPrice,
        status: req.body.status
    });

    try {
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a specific order by id
router.put('/:orderId',async (req, res) => {
    const order = new Order({
        ...req.body
    });
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, order, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.json({ message: err });
    }
});

// DELETE a specific order by id
router.delete('/:orderId', async (req, res) => {
    try {
        const removedOrder = await Order.findByIdAndDelete(req.params.orderId);
        res.json(removedOrder);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;