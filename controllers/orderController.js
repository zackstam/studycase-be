const CartItem = require('../models/cartItemModel');
const DeliveryAddress = require('../models/deliveryAddressModel');
const Order = require('../models/ordersModel');
const { Types } = require('mongoose');
const OrderItem = require('../models/order-itemModel');
const HttpError = require('../interface/httpError');
const { GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { ERROR_SERVER } = require('../constant/errorHttp');
const { GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, statusPayment } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { delivery_fee, delivery_address, order_items } = req.body;
        const address = await DeliveryAddress.findById(delivery_address);
        const payloadOrder = new Order({
            _id: new Types.ObjectId(),
            status: statusPayment.WAITING,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail
            },
            delivery_fee: delivery_fee,
            user: req.user._id 
        });
        const order = await payloadOrder.save();
        const orderItems = await OrderItem.insertMany(order_items.map(item => ({
            name: item.name,
            description: item.description,
            price: parseInt(item.price),
            qty: parseInt(item.qty),
            image: item.image,
            order: order._id
        })));
        const orderItemsId = orderItems.map(item => item._id);
        const newOrder = await Order.findByIdAndUpdate(order._id, { order_items: orderItemsId }, {
            new: true
        });
        req.data = newOrder;
        next();
    }catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const datas = await Order.find().populate('order_items').sort('-createdAt');
        
        req.data = {
            data: datas.map(data => data.toJSON({virtuals: true}))
        };
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const paginate = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const name = req.query.name || '';
        const skip = (page - 1) * limit;
        const data = await Order.find({ "name": { $regex: `${name}` } })
                    .skip(parseInt(skip))
                    .limit(limit)
                    .populate('order_items')
                    .sort('-createdAt');
        const count = await Order.find({ "name": { $regex: `${name}` } }).countDocuments();
        if (data && data.length === number.ZERO) {
            req.data = null;
            next();
        }
        req.data = {
            Users: data,
            count
        };
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

module.exports = {
    create,
    all,
    paginate
}