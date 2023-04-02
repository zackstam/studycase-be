const express = require('express');
const userController = require('../controllers/userController');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate', accessValidate('view', 'User'), userController.paginate);
router.get('/:pid', authorized, accessValidate('view', 'User'), userController.byId)
router.get('/', authorized, accessValidate('view', 'User'), userController.all);
router.post('/', authorized, accessValidate('create', 'User'), userController.create);
router.patch('/:pid', authorized, accessValidate('update', 'User'), userController.update);
router.delete('/:pid', authorized, accessValidate('delete', 'User'), userController.destroy);


module.exports = router;