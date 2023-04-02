const express = require('express')
const categoryController = require('../controllers/categoriesController')
const categoryMiddleware = require('../middleware/categoryMiddleware')

const router = express.Router()

router.get('/', categoryController.all)
router.get('/pagination', categoryController.pagination)
router.get('/:id', categoryMiddleware.validateById, categoryController.byId)
router.post('/', categoryController.create)
router.patch('/:id', categoryMiddleware.validateById, categoryController.update)
router.delete('/:id', categoryMiddleware.validateById, categoryController.destroy)

module.exports = router