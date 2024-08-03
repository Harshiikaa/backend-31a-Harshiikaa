const Favorites = require("../model/favoritesModel");
const cloudinary = require('cloudinary');

const createFavorite = async (req, res) => {
    console.log(req.body);
    const id = req.user.id;

    // destructure data 
    const {
        userID,
        productID,
    } = req.body;
    const createdAt = new Date();

    // validate the data 
    if (!userID || !productID || !createdAt) {
        return res.json({
            success: false,
            message: "Please provide all the details"
        });
    }

    // try-catch block 
    try {
        const existingFavorite = await Favorites.findOne({
            userID: id,
            productID: productID,
        });

        if (existingFavorite) {
            return res.json({
                success: false,
                message: "This item is already in favorites"
            });
        }

        // Create a new favorite entry
        const newFavorite = new Favorites({
            userID: id,
            productID: productID,
            createdAt: createdAt,
        });

        // Save the new favorite
        await newFavorite.save();

        res.status(200).json({
            success: true,
            message: "Added to Favorites",
            data: newFavorite
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};



const getFavoritesByUserID = async (req, res) => {
    const id = req.user.id;
    try {
        const userFavorites = await Favorites.find({ userID: id }).populate('productID', 'productName productPrice productCategory productDescription productImageURL');
        console.log(userFavorites)
        res.json({
            message: "retrieved",
            success: true,
            favorites: userFavorites,
            // count: userFavorites.length,
        });
    } catch (e) {
        res.json({
            message: "error",
            success: false,
        });
    }
};



const getFavorite = async (req, res) => {
    const userID = req.params.id;
    const requestedPage = parseInt(req.query._page, 5)
    const limit = parseInt(req.query._limit, 5)
    const skip = (requestedPage - 1) * limit;

    try {
        const favorites = await Favorites.find({
            userID: userID
        }).populate('productID', 'productName productPrice productCategory productDescription productImageURL ').skip(skip).limit(limit);
        res.json({
            success: true,
            message: "Favourites Fetched successfully",
            favorites: favorites
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json("Server error");

    }

}



const removeFavorite = async (req, res) => {
    try {
        const removedFavorite = await Favorites.findByIdAndRemove(
            req.params.id
        );

        if (!removedFavorite) {
            return res.status(404).json({
                success: false,
                message: "Item not found in favorites",
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from favorites successfully",
            data: removedFavorite,
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
    createFavorite,
    getFavoritesByUserID,
    getFavorite,
    removeFavorite,


};