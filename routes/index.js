
const express = require('express');
const tagRoutes = require('../routes/tag');
const router = express.Router();

router.use('/tag', tagRoutes);

module.exports = router;