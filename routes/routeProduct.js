const express = require('express')
const multer = require('multer')
const mime = require('mime')
const uploadFileMiddleware = require('../middleware/uploadFile')
const productController = require('../controllers/productController')
const productMiddleware = require('../middleware/productMiddleware')
const { authorized } = require('../middleware/passportErrorMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
    }
  })
const upload = multer({ storage })

router.get('/', authorized,productController.all)
router.get('/pagination', productController.pagination)
router.get('/:id', productMiddleware.validateById, productController.byId)
router.post('/', upload.single('image'), uploadFileMiddleware.getFileName, productController.create)
router.patch('/:id', upload.single('image'), productMiddleware.validateById,  uploadFileMiddleware.getFileName, productController.update)
router.delete('/:id', productMiddleware.validateById, productController.destroy)

module.exports = router