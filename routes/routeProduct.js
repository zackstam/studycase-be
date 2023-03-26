const express = require('express')
const multer = require('multer')
const os = require('os')
const productController = require('../controllers/productController')
const productMiddleware = require('../middleware/productMiddleware')

const router = express.Router()

router.get('/product', productController.all)
router.get('/product', productController.pagination)
router.get('/product/:id', productMiddleware.validateById, productController.byId)
router.post('/product', productController.create)
router.patch('/product/:id', productMiddleware.validateById, productController.update)
router.delete('/product/:id', productMiddleware.validateById, productController.destroy)

module.exports = router