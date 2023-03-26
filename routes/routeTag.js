const express = require('express')
const tagController = require('../controllers/tagController')
const tagMiddleware = require('../middleware/tagMiddleware')

const router = express.Router()

router.get('/tag', tagController.all)
router.get('/tag', tagController.pagination)
router.get('/tag/:id', tagMiddleware.validateById, tagController.byId)
router.post('/tag', tagController.create)
router.patch('/tag/:id', tagMiddleware.validateById, tagController.update)
router.delete('/tag/:id', tagMiddleware.validateById, tagController.destroy)

module.exports = router