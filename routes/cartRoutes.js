const router = require('express').Router()
const cartController = require("../controllers/cartController");
const { authGuard } = require('../middleware/authGaurd');

// create favorite API
router.post('/addToCart', authGuard, cartController.addToCart)
router.get('/getCartByUserID/:id', authGuard, cartController.getCartByUserID)
router.get('/getCart/:id', cartController.getCart)
router.put("/updateCart/:id", authGuard, cartController.updateCart)
router.delete("/removeFromCart/:id", authGuard, cartController.removeFromCart)

module.exports = router;