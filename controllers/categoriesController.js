const Category = require('../models/categoriesModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const data = new Category({name});
        await data.save();
            return res.status(200).json({ message: generalMessage.SUCCESS, data: data });
    } catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const data = await Category.find();
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
        const findbyIDCategory = await Category.findById(id);
        return res.status(number.TWO_HUNDRED).json({ message: generalMessage.SUCCESS, data: findbyIDCategory});
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        let dataCategory = await Category.findByIdAndUpdate(id, { name }, {
            new: true
        });
        return res.status(200).json({ message: generalMessage.SUCCESS, data: dataCategory });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndRemove(id);
        return res.status(200).json({ message: generalMessage.SUCCESS, data: true });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { skip = 0, limit = 10, q = ''} = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        let count = await Category.find().countDocuments();
        let data = await Category
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        
        return res.status(200).json({ message: generalMessage.SUCCESS, data: data, count });
    }catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
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