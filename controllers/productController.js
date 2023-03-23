const HttpError = require('../interface/httpError');
const Product = require('../models/product');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');



const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const dataProduct = await Product.findById(id);
        return res.status(number.TWO_HUNDRED).json({ message: generalMessage.SUCCESS, data: dataProduct});
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await Product.find();
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }
        req.data = data;
        next()
        // return res.status(200).json({ message: generalMessage.SUCCESS, data });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const paginate = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const name = req.query.name || '';
        const skip = (page - 1) * limit;
        const data = await Product.find({ "name": { $regex: `${name}` } })
                    .skip(skip)
                    .limit(limit);
        const count = await Product.find({ "name": { $regex: `${name}` } }).countDocuments();
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }
        return res.status(200).json({ message: generalMessage.SUCCESS, data: {
            Products: data,
            count
        } });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const create = async (req, res, next) => {

    try {
        const payloadProduct = new Product({
            name: req.body.name,
            image: req.body.image

        })
        const data = await payloadProduct.save();
        req.data = data;
        next();
    } catch (error) {
        console.log(error);
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const { name } = req.body;
    try {
        let dataProduct = await Product.findByIdAndUpdate(id, { name }, {
            new: true
        });
        return res.status(200).json({ message: generalMessage.SUCCESS, data: dataProduct });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const ProductId = req.params.pid;
    try {
        await Product.findByIdAndRemove(ProductId);
        return res.status(200).json({ message: generalMessage.SUCCESS, data: true });

    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    paginate,
    byId,
    all,
    create,
    update,
    destroy
}