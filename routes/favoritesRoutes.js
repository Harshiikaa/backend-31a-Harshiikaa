const router = require('express').Router()
const favoriteController = require("../controllers/favoriteController");
const { authGuard } = require('../middleware/authGaurd');

// create favorite API
router.post('/createFavorite', authGuard, favoriteController.createFavorite)
router.get('/getFavoriteByUserID/:id',authGuard, favoriteController.getFavoritesByUserID)
router.get('/getFavorite/:id', favoriteController.getFavorite)
router.delete("/removeFavorite/:id", authGuard, favoriteController.removeFavorite)

module.exports = router;