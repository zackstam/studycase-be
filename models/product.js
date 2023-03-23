const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name:  { type: String, required: true }, // String is shorthand for {type: String}
  image:  { type: String, required: true }, // String is shorthand for {type: String}
});

module.exports = mongoose.model('product', productSchema);