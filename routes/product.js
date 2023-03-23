const express = require('express');
const productController = require('../controllers/productController')
const uploadFileMiddleware = require('../middleware/uploadFile');
const multer  = require('multer');

const router = express.Router();
const upload = multer({ storage: uploadFileMiddleware.storage })

// router.get('/paginate', productController.paginate);
// router.get('/:pid',tagMiddleware.validateById, productController.byId)
// router.get('/', productController.all);
router.post('/', upload.single('image'), uploadFileMiddleware.getFileName, productController.create);
// router.patch('/:pid', tagMiddleware.validateById, productController.update);
// router.delete('/:pid', tagMiddleware.validateById, productController.destroy);


module.exports = router;