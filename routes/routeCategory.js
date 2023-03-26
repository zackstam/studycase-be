const express = require('express')
const categoryController = require('../controllers/categoriesController')
const categoryMiddleware = require('../middleware/categoryMiddleware')

const router = express.Router()

router.get('/category', categoryController.all)
router.get('/category', categoryController.pagination)
router.get('/category/:id', categoryMiddleware.validateById, categoryController.byId)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryMiddleware.validateById, categoryController.update)
router.delete('/category/:id', categoryMiddleware.validateById, categoryController.destroy)

module.exports = router