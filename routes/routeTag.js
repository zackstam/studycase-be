const express = require('express')
const tagController = require('../controllers/tagController')
const tagMiddleware = require('../middleware/tagMiddleware')

const router = express.Router()

router.get('/', tagController.all)
router.get('/pagination', tagController.pagination)
router.get('/:id', tagMiddleware.validateById, tagController.byId)
router.post('/', tagController.create)
router.patch('/:id', tagMiddleware.validateById, tagController.update)
router.delete('/:id', tagMiddleware.validateById, tagController.destroy)

module.exports = router