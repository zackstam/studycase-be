const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Invoice = require('./invoiceModel')

const orderSchema = new Schema ({
    status:{
        type: String,
        default: 'Processing'
    },

    delivery_address: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryAddress'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    totalPrice:{
        type: Number,
        required: true,
    },

    cart:{
        type: Array,
        required: true,
    },

    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
}, {timestamps: true} )

orderSchema.virtual('items_count').get(function(){
    return this.cart.reduce((total, item) => total + parseInt(item.qty), 0);
});
orderSchema.post('save', async function(){
    let invoice = new Invoice({
        user: this.user,
        order: this._id,
        total: this.totalPrice,
        delivery_address: this.delivery_address
    })
    await invoice.save();
})

module.exports = mongoose.model('Order', orderSchema);