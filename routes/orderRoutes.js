const router = require('express').Router()
const orderController = require("../controllers/orderController");
const { authGuard } = require('../middleware/authGaurd');

// create favorite API
router.post('/createOrder', authGuard, orderController.createOrder)
router.get('/getOrderByUserID/:id',authGuard, orderController.getOrderByUserID)


module.exports = router;