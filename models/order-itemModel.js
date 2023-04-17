const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = new Schema ({

    name: {
        type: String,
        required: true
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

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);