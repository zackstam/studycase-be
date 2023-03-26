const Tag = require('../models/tagModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    let payload = new Tag(req.body)
    try {
        let addTag = await payload.save();
        return res.status(200).json({ message: generalMessage.SUCCESS, addTag });
    } catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const data = await Tag.find();
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }return res.status(200).json({ message: generalMessage.SUCCESS, data });
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const byId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const findbyIDTag = await Tag.findById(id);
        return res.status(number.TWO_HUNDRED).json({ message: generalMessage.SUCCESS, data: findbyIDTag});
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id;
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
    const id = req.params.id;
    try {
        await Tag.findByIdAndRemove(id);
        return res.status(200).json({ message: generalMessage.SUCCESS, data: true });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { page, limit } = req.query;
        const showallTag = await Tag
        .find()
        .page(parseInt(page))
        .limit(parseInt(limit));
        return res.status(200).json({ message: generalMessage.SUCCESS, showallTag });
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error);
    }
}


module.exports = {
    create,
    all,
    byId,
    update,
    destroy,
    pagination
}