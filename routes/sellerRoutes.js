const router = require('express').Router()
const sellerController = require("../controllers/sellerController")
const { authGuardSeller } = require('../middleware/authGaurd')

// get route for login and register
router.post('/create', sellerController.createSeller)
router.post('/login', sellerController.loginSeller)
router.get('/getSellers', sellerController.getAllSellers)
router.get('/getSeller/:id', sellerController.getSingleSeller)
router.put("/updateSeller/:id", authGuardSeller, sellerController.updateSeller)
router.delete("/deleteSeller/:id", authGuardSeller, sellerController.deleteSeller)
module.exports = router;