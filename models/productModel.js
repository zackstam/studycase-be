const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new Schema ({
    name:{
        type: String,
        minlength: [3, 'minimal karakter harus lebih dari 3'],
        required: [true, 'nama harus di isi']
    },

    description: {
        type: String,
        maxlength: [1000, 'Masukkan deskripsi produk (opsional)']
    },

    price: {
        type: Number,
        default: 0
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },

    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }

}, {timestamps: true })

module.exports = mongoose.model('Product', productSchema)