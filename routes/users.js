const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();


router.get('/paginate', userController.paginate);
router.get('/:pid', userController.byId)
router.get('/', userController.all);
router.post('/', userController.create);
router.patch('/:pid', userController.update);
router.delete('/:pid', userController.destroy);


module.exports = router;