const CartItem = require('../models/cartItemModel');
const DeliveryAddress = require('../models/deliveryAddressModel');
const Order = require('../models/ordersModel');
const { Types } = require('mongoose');
const OrderItem = require('../models/order-itemModel');
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { WAITING_PAYMENT_STATUS, DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const {delivery_fee, delivery_address} = req.body;
        const items = await CartItem.find({user: req.user._id}).populate('product');
        if (!items) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }

        const address = await DeliveryAddress.findById(delivery_address);
        const order = new Order({
            _id: new Types.ObjectId(),
            status: res.status(number.ONE).json(WAITING_PAYMENT_STATUS),
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
        const orderItems = await OrderItem.insertMany(items.map(item => ({
            ...item,
            name: item.product.name,
            description: item.product.description,
            price: parseInt(item.product.price),
            qty: parseInt(item.qty),
            product: item.product._id
        })));
        orderItems.forEach(item => order.order_items.push(item));
        order.save();
        await CartItem.deleteMany({user: req.user._id});
        req.data = order;
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