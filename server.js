const express = require('express');
const app = express();
const conDb = require('./config/db');
const mongoose = require('mongoose');
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Saad!');
    });



    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });