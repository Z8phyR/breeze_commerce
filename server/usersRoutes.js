const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');


const {User} = require('../database/database');

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

//Get a specific user by id
router.get('/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
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
        if (user && await bcrypt.compare(req.body.password,user.password)) {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.header('auth-token', token).send(token);
        }
        else {
            res.status(400).send('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send('Invalid credentials');
    }
});





// Middleware for Protected Routes
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = router;