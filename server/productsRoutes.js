const express = require('express');
const router = express.Router();
const { Product } = require('../database/database');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET a specific product by id
router.get('/:productId', async (req, res) => {
    // console.log('Product ID:', req.params.productId); // Log the product ID
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST a new product
router.post('/post', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a specific product by id
router.put('/:productId',async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.json({ message: err });
    }
});


// DELETE a specific product by id
router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.findByIdAndDelete(req.params.productId);
        res.json(removedProduct);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
