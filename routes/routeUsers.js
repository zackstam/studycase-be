const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();


router.get('/paginate', userController.paginate);
router.get('/:id', userController.byId)
router.get('/', userController.all);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);


module.exports = router;