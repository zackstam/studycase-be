const HttpError = require('../interface/httpError');
const User = require('../models/userModel');
const { hashing } = require('../utility/utility');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');



const byId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await User.findById(id);
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }return res.status(200).json({ message: generalMessage.SUCCESS, data });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await User.find();
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }return res.status(200).json({ message: generalMessage.SUCCESS, data });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const paginate = async (req, res, next) => {
    try {
        let { skip = '', limit = '', page = '', q = '' } = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        let count = await User.find().countDocuments();
        let data = await Product
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .page(parseInt(page));
        
        return res.status(200).json({ message: generalMessage.SUCCESS, data: data, count });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const create = async (req, res, next) => {

    try {
        const hashedPassword = await hashing(req.body.password);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const data = await user.save();
        return res.status(200).json({ message: generalMessage.SUCCESS, data });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name }, {
            new: true
        });
        return res.status(200).json({ message: generalMessage.SUCCESS, user });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const tagId = req.params.id;
    try {
        await User.findByIdAndRemove(tagId);
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