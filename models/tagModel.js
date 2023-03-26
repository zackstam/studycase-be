const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const tagSchema = new Schema ({
    name:{
        type: String,
        minlength: [3, 'minimal karakter harus lebih dari 3'],
        maxlength: [50, 'maksimal karakter harus kurang dari 50'],
        required: [true, 'nama harus di isi']
    }
})

module.exports = mongoose.model('Tag', tagSchema)