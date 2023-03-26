// const path = require('path')
// const fs = require('fs')
// const config = require('../app/config')
const Product = require('../models/productModel')
const Category = require('../models/categoriesModel')
const Tag = require('../models/tagModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    let payload = req.body;
    try {
        if(payload.category){
            let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
            if(category){
                payload = {...payload, category: category._id};
            }else{
                delete payload.category;
            }
        }

        if(payload.tag){
            let tag = await Tag.findOne({name: {$regex: payload.tag, $options: 'i'}});
            if(tag){
                payload = {...payload, tag: tag._id};
            }else{
                delete payload.tag;
            }
        }

        let product = new Product(payload);
        let addproduct = await product.save();
        return res.status(200).json({ message: generalMessage.SUCCESS, addproduct });
    } catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const data = await Product.find().populate('category').populate('tag');
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
        const findbyIDProduct = await Product.findById(id).populate('category').populate('tag');
        return res.status(number.TWO_HUNDRED).json({ message: generalMessage.SUCCESS, data: findbyIDProduct});
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        if(payload.category && payload.category.length > 0){
            let category = await Category.find({name: {$in: payload.category}});
            if(category.length){
                payload = {...payload, category: category.map(categories => categories._id)};
            }else{
                delete payload.category;
            }
        }

        if(payload.tag && payload.tag.length > 0){
            let tag = await Tag.find({name: {$in: payload.tag}});
            if(tag.length){
                payload = {...payload, tag: tag.map(tags => tags._id)};
            }else{
                delete payload.tag;
            }
        }

        let dataProduct = await Product.findByIdAndUpdate(id, payload, {
            new: true
        });
        return res.status(200).json({ message: generalMessage.SUCCESS, data: dataProduct });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndRemove(id);
        return res.status(200).json({ message: generalMessage.SUCCESS, data: true });
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { page, limit } = req.query;
        const showallProduct = await Product
        .find()
        .page(parseInt(page))
        .limit(parseInt(limit))
        .populate('category')
        .populate('tag');
        return res.status(200).json({ message: generalMessage.SUCCESS, showallProduct });
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