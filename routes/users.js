const express = require('express');
const userController = require('../controllers/userController');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate', authorized, accessValidate('read', 'User'), userController.paginate);
router.get('/:pid', authorized, accessValidate('view', 'User'), userController.byId)
router.get('/', authorized, userController.all);
router.post('/admin', authorized, accessValidate('create', 'User'), userController.createAdmin);
router.post('/users', authorized, accessValidate('create', 'User'), userController.createUser);
router.patch('/:pid', authorized, accessValidate('update', 'User'), userController.update);
router.delete('/:pid', authorized, accessValidate('delete', 'User'), userController.destroy);


module.exports = router;