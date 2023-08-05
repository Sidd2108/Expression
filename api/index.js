const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const multer = require('multer');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    "origin": "http://localhost:5173",
    "credentials": true,
}));

app.use('/uploads', express.static(__dirname + '/uploads'));
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
});


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));

    }
    res.json(uploadedFiles);
});



app.get('/expressions', async (req, res) => {
    res.json(await Post.find().populate({ path: 'owner', select: 'name' }));
})

app.post('/expressions', (req, res) => {
    const { token } = req.cookies;
    const { title, content, addedPhotos } = req.body;
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;

        const postDoc = await Post.create({
            owner: userData.id,
            title, content, photos: addedPhotos,
            postedAt: new Date().getDate()
        })
        res.json(postDoc);
    });
});


app.put('/expressions', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, content, addedPhotos } = req.body;

    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;
        const postDoc = await Post.findById(id);

        if (userData.id === postDoc.owner.toString()) {
            postDoc.set({
                title, content, photos: addedPhotos
            });
            await postDoc.save();
            res.json('ok');
        }
    })
})



app.get('/expressions/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Post.findById(id).populate({ path: 'owner', select: 'name' }));
});

app.get('/user-posts', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Post.find({ owner: id }));
    })
})


app.post('/add-to-favourites/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;
        const userDoc = await User.findById(userData.id);
        const favPosts = userDoc.favPosts;
        if (!favPosts.includes(id)) {
            favPosts.push(id);
            userDoc.set({
                favPosts
            })
            await userDoc.save();
            res.json("Added to favourites");
        } else {
            res.json("Already in Favourites");
        }

    })
})


app.get('/favourite-posts', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;
        const userDoc = await User.findById(userData.id);
        const favPosts = userDoc.favPosts;
        const posts = await Post.find({ '_id': { $in: favPosts } }).populate({ path: 'owner', select: 'name' });
        res.json(posts);
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});