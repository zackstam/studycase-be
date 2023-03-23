const HttpError = require('../interface/httpError');
const Tag = require('../models/tag');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');



const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const data = await Tag.findById(id);
        req.data = data
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await Tag.find();
        req.data = data
        next();
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
        const data = await Tag.find({ "name": { $regex: `${name}` } })
                    .skip(skip)
                    .limit(limit);
        const count = await Tag.find({ "name": { $regex: `${name}` } }).countDocuments();
        if (data && data.length === number.ZERO) {
            req.data = null;
            next();
        }
        req.data = {
            tags: data,
            count
        };
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const create = async (req, res, next) => {

    try {
        const payloadTag = new Tag({
            name: req.body.name
        })
        const data = await payloadTag.save();
        return res.status(200).json({ message: generalMessage.SUCCESS, data });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const { name } = req.body;
    try {
        let dataTag = await Tag.findByIdAndUpdate(id, { name }, {
            new: true
        });
        return res.status(200).json({ message: generalMessage.SUCCESS, data: dataTag });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const tagId = req.params.pid;
    try {
        await Tag.findByIdAndRemove(tagId);
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