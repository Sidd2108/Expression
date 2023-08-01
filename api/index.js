const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    "origin": "http://localhost:5173",
    "credentials": true,
}));

mongoose.connect(process.env.MONGO_URL);
const bcryptSalt = bcrypt.genSaltSync(15);
const jwtsecret = process.env.JWT_SECRET;



app.get("/test", (req, res) => {
    res.send('<h1>test</h1>');
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passok = bcrypt.compareSync(password, userDoc.password);
        if (passok) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtsecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        }
        else {
            res.json('Incorrect Password');
        }
    }
    else {
        res.status(422).json('User not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtsecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await User.findById(userData.id);
            res.json(userDoc);
        })
    }
    else {
        res.json(null);
    }

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})