const Product = require('../models/productModel')
const Category = require('../models/categoriesModel')
const Tag = require('../models/tagModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { name, description, price, image } = req.body;

        const categories = await Category.findOne({ name: req.body.category });
        const tags = await Tag.find({ name: { $in: req.body.tag } });
        const payload = new Product({
            name: name,
            description: description,
            price: price,
            image: image,
            category: categories._id,
            tag: tags.map(tag => tag._id)
        });
        const data = await payload.save();
        
        req.data = data;
        next();
    } catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const data = await Product.find().populate('category').populate('tag');
        
        req.data = data;
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const data = await Product.findById(id).populate('category').populate('tag');
        
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.pid;
        const { name, description, price, image, category, tag } = req.body;

        const categories = await Category.findOne({ name: req.body.category });
        const tags = await Tag.find({ name: { $in: req.body.tag } });
        const data = await Product.findByIdAndUpdate(id, {
            name: name,
            description: description,
            price: price,
            image: image,
            category: categories._id,
            tag: tags.map(tag => tag._id)
        }, { new: true });

        await data.save();
            req.data = data;
            next();
        } catch (error) {
            const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
            return next(err)
        }
}

const destroy = async (req, res, next) => {
    const id = req.params.pid;
    try {
        await Product.findByIdAndRemove(id);
        
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { skip = '', limit = '', page = '', q = '', category = '', tag = '' } = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        if(category.length){
            let categories = await Category.find({name: {$in: category}});

            if(categories){
                criteria = {...criteria, category: {$in: categories.map(category => category._id)}};
            }
        }
        if(tag.length){
            let tags = await Tag.find({name: {$in: tag}});

            if(tags.length > 0){
                criteria = {...criteria, tag: {$in: tags.map(tag => tag._id)}};
            }
        }

        let count = await Product.find().countDocuments();
        let data = await Product
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .page(parseInt(page))
        .populate('category')
        .populate('tag');
        
        req.data = {
            Products: data,
            count
        }
        next();
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