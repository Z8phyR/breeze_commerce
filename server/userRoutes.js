const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');


//User registration
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = new UserActivation( {
            ...req.body,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.json(savedUser);
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


