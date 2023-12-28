const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');

const { User } = require('../database/database');

// Middleware for Protected Routes
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    // console.log('Token:', token); // Log the received token
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        // console.log('Verified:', verified); // Log the verification result
        req.user = verified;
        next();
    } catch (err) {
        // console.log('Verification Error:', err); // Log any error
        res.status(401).json({ message: 'Invalid Token' }); // Change to 401
    }
};

//User registration
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = new User( {
            ...req.body,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.json(savedUser);


    } catch (err) {
        res.json({ message: err });

    }
});

//Get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });

    }
});


//Update a specific user by id
router.put('/:userId', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = await User.findByIdAndUpdate(req.params.userId, {
            ...req.body,
            password: hashedPassword
        }, { new: true });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }});

//Delete a specific user by id
router.delete('/:userId', async(req, res) => {
    try {
        const removedUser = await User.findByIdAndDelete(req.params.userId);
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});


//User login
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            console.log('User logged in');
            res.json({ token: token }); // Respond with JSON
        } else {
            console.log('Invalid credentials')
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//User logout
router.post('/logout', async(req, res) => {
    try {
        // Clear the cookie named 'token'
        res.clearCookie('token');

        // Optionally, add a console log for server-side logging
        console.log('User logged out');

        // Send a response to the client
        res.json({ message: 'User logged out' });

        // Do not attempt to send any more responses after this point
    } catch (err) {
        // Send an error response if there's an exception
        res.status(500).json({ message: err.message });
    }
});


//User profile
router.get('/profile', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//Get a specific user by id
router.get('/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });

    }
});


module.exports = router;