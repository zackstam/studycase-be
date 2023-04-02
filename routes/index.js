const express = require('express')
const routerProduct = require('./routeProduct')
const routerCategory = require('./routeCategory')
const routerTag = require('./routeTag')
const routerUser = require('./routeUsers')
const authRouter = require('./auth')
const router = express.Router()

router.use('/product', routerProduct)
router.use('/category', routerCategory)
router.use('/tag', routerTag)
router.use('/user', routerUser)
router.use('/auth', authRouter)

module.exports = router