const express = require('express');
const { Order } = require('../database/database');
const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
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
router.post('/post', async (req, res) => {
    const order = new Order({
        ...req.body
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