const mongoose = require('mongoose');
const { Schema } = mongoose;
const { dbHost, portApp, product } = require('../config');

const productSchema = new Schema({
  name:  { type: String, required: true }, // String is shorthand for {type: String}
  image:  { 
    type: String, 
    required: true,
    get: (data) => `${dbHost}:${portApp}/${product}`  + data
  }
}, { toJSON: { getters: true } });

module.exports = mongoose.model('product', productSchema);