const express = require('express');
const router = express.Router();
const { Review } = require('../database/database');
const { verifyToken } = require("./usersRoutes"); // Import the verifyToken function
// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST a new review
router.post('/post', verifyToken, async (req, res) => {
    userId = req.user._id;

    const review = new Review({
        productId: req.body.productId,
        userId: userId,
        review: req.body.review,
        rating: req.body.rating
    });
    
    try {
        const savedReview = await review.save();
        console.log("SAVED REVIEW: ", savedReview);
        res.json(savedReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

// GET a specific review by id
router.get('/:reviewId', async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        res.json(review);
    } catch (err) {
        res.json({ message: err });
    }
}); 

// UPDATE a specific review by id
router.put('/:reviewId',async (req, res) => {
    const review = new Review({
        ...req.body
    });
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, review, { new: true });
        res.json(updatedReview);
    } catch (err) {
        res.json({ message: err });
    }
}); 

// DELETE a specific review by id
router.delete('/:reviewId', async (req, res) => {
    try {
        const removedReview = await Review.findByIdAndDelete(req.params.reviewId);
        res.json(removedReview);
    } catch (err) {
        res.json({ message: err });
    }
}); 

module.exports = router;

