
const express = require('express');
const tagRoutes = require('../routes/tag');
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const categoryRoutes = require('../routes/category')
const router = express.Router();

router.use('/category', categoryRoutes);
router.use('/tag', tagRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);


module.exports = router;