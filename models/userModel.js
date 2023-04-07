const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  { type: String, required: true },
  costumer_id: { type: Number, required: true},
  username: { type: String, required: true },
  email: {type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});


module.exports = mongoose.model('User', userSchema);