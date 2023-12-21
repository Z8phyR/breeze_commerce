const express = require('express');
const app = express();
const productsRoutes = require('./productsRoutes');


app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/api/products', productsRoutes);


// User Login
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password,user.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        // res.header('auth-token', token).send(token);
        res,status(200).send(token);
    }
    else {
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




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
