const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name:  { type: String, required: true }, // String is shorthand for {type: String}
});

module.exports = mongoose.model('category', categorySchema);