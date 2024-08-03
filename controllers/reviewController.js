const Review = require("../model/reviewModel");
const RatingAndReview = require("../model/reviewModel");

const createReview = async (req, res) => {
    console.log(req.body);
    const id = req.user.id;

    // destructure data
    const {
        userID,
        productID,
        review,
        sellerID
    } = req.body;

    // validate the data
    if (!userID || !productID || !review || !sellerID) {
        return res.json({
            success: false,
            message: "Please provide all the details",
        });
    }

    // try-catch block
    try {
        // Create a new rating and review entry
        const newReview = new Review({
            userID: id,
            productID: productID,
            review: review,
            sellerID: sellerID,
        })
        // Save the new rating and review
        await newReview.save();
        res.status(200).json({
            success: true,
            message: " Review added successfully",
            data: Review,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

const getReviewsByUserID = async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await Review.find({ userID: id });
        console.log(reviews);
        res.json({
            message: "Reviews retrieved",
            success: true,
            review: reviews,
        });
    } catch (e) {
        console.error(e);
        res.json({
            message: "Error",
            success: false,
        });
    }
};



const getReviewsBySellerID = async (req, res) => {
    const id = req.params.id;
    try {
        const userReviews = await Review.find({ sellerID: id });
        console.log(userReviews);
        res.json({
            message: "Reviews retrieved",
            success: true,
            review: userReviews,
        });
    } catch (e) {
        console.error(e);
        res.json({
            message: "Error",
            success: false,
        });
    }
};

// const getRatingsAndReviews = async (req, res) => {
//     const userID = req.params.id;
//     const requestedPage = parseInt(req.query._page, 5);
//     const limit = parseInt(req.query._limit, 5);
//     const skip = (requestedPage - 1) * limit;

//     try {
//         const ratingsAndReviews = await RatingAndReview.find({
//             userID: userID,
//         }).skip(skip).limit(limit);

//         res.json({
//             success: true,
//             message: "Ratings and Reviews Fetched successfully",
//             ratingsAndReviews: ratingsAndReviews,
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json("Server error");
//     }
// };

const removeReview = async (req, res) => {
    try {
        const removedReview = await Review.findByIdAndRemove(
            req.params.id
        );

        if (!removedReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Review removed successfully",
            data: removedReview,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createReview,
    getReviewsByUserID,
    getReviewsBySellerID,
    // getReviewsByUserID,
    // getRatingsAndReviews,
    removeReview,
};
