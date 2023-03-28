const mongoose = require('mongoose');
const { Schema } = mongoose;
const { dbHost, portApp, product } = require('../config');

const productSchema = new Schema({
  name:  { 
      type: String,
      required: true,
      set: v => {
        return v.toLowerCase() 
      } 
  }, // String is shorthand for {type: String}
  image:  { 
    type: String, 
    get: (data) => `${dbHost}:${portApp}/${product}`  + data
  }
}, { toJSON: { getters: true } });

module.exports = mongoose.model('product', productSchema);