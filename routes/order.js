const express = require('express');
const orderController = require('../controllers/orderController');
const { accessValidateUser, accessValidateOrder } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate/:user_id', authorized, accessValidateUser('paginate', 'Order'), orderController.paginate);
router.get('/:user_id', authorized, accessValidateUser('view', 'Order'), orderController.all);
router.post('/:user_id', authorized, accessValidateOrder('create', 'Order'), orderController.create);

module.exports = router;