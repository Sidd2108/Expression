const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get("/", (req, res) => {
    res.send('<h1>Hello</h1>');
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})