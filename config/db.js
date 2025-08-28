const mongoose = require('mongoose');


const conDb = mongoose.connect('mongodb://localhost:27017/Apple')







module.exports = conDb;