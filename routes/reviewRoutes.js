const router = require('express').Router()
const reviewController = require("../controllers/reviewController");
const { authGuard } = require('../middleware/authGaurd');

// create favorite API
router.post('/createReview', authGuard, reviewController.createReview)
router.get('/getReviewsBySellerID/:id', reviewController.getReviewsBySellerID)
router.get('/getReviewsByUserID/:id', reviewController.getReviewsByUserID)
// router.get('/getRatingsAndReviews/:id', ratingAndReviewController.getRatingsAndReviews)
router.delete("/removeReview/:id", authGuard, reviewController.removeReview)

module.exports = router;