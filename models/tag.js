const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name:  { type: String, required: true }, // String is shorthand for {type: String}
});

module.exports = mongoose.model('tag', tagSchema);