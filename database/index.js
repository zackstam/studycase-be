const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/db_schoolsd");
const db = mongoose.connection;


module.exports = {
    db
}