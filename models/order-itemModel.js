const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    qty: {
        type: Number,
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
});

module.exports = model('OrderItem', orderItemSchema);