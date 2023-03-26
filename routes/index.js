
const express = require('express');
const tagRoutes = require('../routes/tag');
const productRoutes = require('../routes/product');
const router = express.Router();

router.use('/tag', tagRoutes);
router.use('/product', productRoutes);

module.exports = router;