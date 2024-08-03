const Rating = require("../model/ratingModel");

const createRating = async (req, res) => {
    console.log(req.body);
    const id = req.user.id;

    // destructure data 
    const {
        userID,
        productID,
        sellerID,
        rating,
    } = req.body;

    // validate the data 
    if (!userID || !productID || !sellerID || !rating) {
        return res.json({
            success: false,
            message: "Please provide all the details"
        });
    }

    // try-catch block 
    try {
        const existingRating = await Rating.findOne({
            userID: id,
            productID: productID,
        });

        if (existingRating) {
            return res.json({
                success: false,
                message: "Already Rated"
            });
        }

        // Create a new favorite entry
        const newRating = new Rating({
            userID: id,
            productID: productID,
            sellerID: sellerID,
            rating: rating,
        });

        // Save the new favorite
        await newRating.save();

        res.status(200).json({
            success: true,
            message: "Added to Favorites",
            data: newRating
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

const updateRating = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const {
        userID,
        productID,
        sellerID,
        rating,
    } = req.body;

    const id = req.params.id;
    if (!userID
        || !productID
        || !sellerID
        || !rating

    ) {
        return res.json({
            success: true,
            message: "All fields are required!"
        })
    }
    try {
        const updatedRating = {
            userID: userID,
            productID: productID,
            sellerID: sellerID,
            rating: rating,

        }
        await Rating.findByIdAndUpdate(id, updatedRating);
        res.json({
            success: true,
            message: "Rating Changed",
            rating: updatedRating
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }

}




// const getFavoritesByUserID = async (req, res) => {
//     const id = req.user.id;
//     try {
//         const userFavorites = await Favorites.find({ userID: id }).populate('productID', 'productName productPrice productCategory productDescription productImageURL');
//         console.log(userFavorites)
//         res.json({
//             message: "retrieved",
//             success: true,
//             favorites: userFavorites,
//             // count: userFavorites.length,
//         });
//     } catch (e) {
//         res.json({
//             message: "error",
//             success: false,
//         });
//     }
// };



// const getFavorite = async (req, res) => {
//     const userID = req.params.id;
//     const requestedPage = parseInt(req.query._page, 5)
//     const limit = parseInt(req.query._limit, 5)
//     const skip = (requestedPage - 1) * limit;

//     try {
//         const favorites = await Favorites.find({
//             userID: userID
//         }).populate('productID', 'productName productPrice productCategory productDescription productImageURL ').skip(skip).limit(limit);
//         res.json({
//             success: true,
//             message: "Favourites Fetched successfully",
//             favorites: favorites
//         })

//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).json("Server error");

//     }

// }



// const removeFavorite = async (req, res) => {
//     try {
//         const removedFavorite = await Favorites.findByIdAndRemove(
//             req.params.id
//         );

//         if (!removedFavorite) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Item not found in favorites",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Item removed from favorites successfully",
//             data: removedFavorite,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// };


module.exports = {
    createRating,
    updateRating
    // getFavoritesByUserID,
    // getFavorite,
    // removeFavorite,


};