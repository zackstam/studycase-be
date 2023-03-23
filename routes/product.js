const express = require('express');
const productController = require('../controllers/productController')
const uploadFileMiddleware = require('../middleware/uploadFile');


const router = express.Router();

// router.get('/paginate', productController.paginate);
// router.get('/:pid',tagMiddleware.validateById, productController.byId)
// router.get('/', productController.all);
router.post('/', uploadFileMiddleware.uploadFile, productController.create);
// router.patch('/:pid', tagMiddleware.validateById, productController.update);
// router.delete('/:pid', tagMiddleware.validateById, productController.destroy);


module.exports = router;