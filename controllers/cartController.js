const Cart = require("../model/cartModel");

const addToCart = async (req, res) => {
    console.log(req.body);
    const id = req.user.id;

    // destructure data 
    const {
        userID,
        productID,
        // productPrice,
        quantity,
    } = req.body;


    // validate the data 
    if (!userID || !productID || !quantity) {
        return res.json({
            success: false,
            message: "Please provide all the details"
        });
    }

    // try-catch block 
    try {
        const existingInCart = await Cart.findOne({
            userID: id,
            productID: productID,
            // productPrice: productPrice,
            quantity: quantity
        });

        if (existingInCart) {
            return res.json({
                success: false,
                message: "This item is already in cart"
            });
        }

        // Create a new cart entry
        const newCart = new Cart({
            userID: id,
            productID: productID,
            // productPrice: productPrice,
            quantity: quantity,

        });

        // Save the new cart
        await newCart.save();

        res.status(200).json({
            success: true,
            message: "Added to cart",
            data: newCart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};



const getCartByUserID = async (req, res) => {
    const id = req.user.id;
    try {
        const cart = await Cart.find({ userID: id }).populate('productID', 'productName productPrice productCategory productDescription productImageURL');
        res.json({
            message: "retrieved",
            success: true,
            cart: cart,
            // count: userCart.length,
        });
    } catch (e) {
        res.json({
            message: "error",
            success: false,
        });
    }
};




const getCart = async (req, res) => {
    const userID = req.params.id;
    const requestedPage = parseInt(req.query._page, 5)
    const limit = parseInt(req.query._limit, 5)
    const skip = (requestedPage - 1) * limit;

    try {
        const cart = await Cart.find({
            userID: userID
        }).populate('productID', 'productName productPrice productCategory productDescription productImageURL ').skip(skip).limit(limit);
        res.json({
            success: true,
            message: "Carts Fetched successfully",
            cart: cart
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json("Server error");

    }

}
// const updateCart = async (req, res) => {
//     console.log(req.body);

//     const products = req.body.products;
//     const id = req.params.id;

//     if (!products || !Array.isArray(products)) {
//         return res.json({
//             success: false,
//             message: "Invalid payload format!"
//         });
//     }

//     try {
//         const promises = [];

//         for (const product of products) {
//             const { productID, quantity } = product;

//             // Convert quantity to a number
//             const numericQuantity = parseInt(quantity, 10);

//             if (isNaN(numericQuantity)) {
//                 return res.json({
//                     success: false,
//                     message: "Invalid quantity format!"
//                 });
//             }

//             const updatedCartItem = {
//                 quantity: numericQuantity
//             };

//             // Assuming you have a Cart model and the endpoint is for updating cart items
//             const updatedItem = await Cart.findByIdAndUpdate(productID, updatedCartItem, { new: true });
//             promises.push(updatedItem);
//         }

//         const updatedCartItems = await Promise.all(promises);

//         res.json({
//             success: true,
//             message: "Cart items updated successfully",
//             cartItems: updatedCartItems
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };

const updateCart = async (req, res) => {
    console.log(req.body);

    const products = req.body.products;
    const userId = req.params.id; // Assuming you are passing userID as a parameter

    if (!products || !Array.isArray(products)) {
        return res.json({
            success: false,
            message: "Invalid payload format!"
        });
    }

    try {
        const promises = [];

        for (const product of products) {
            const { productID, quantity } = product;

            // Convert quantity to a number
            const numericQuantity = parseInt(quantity, 10);

            if (isNaN(numericQuantity)) {
                return res.json({
                    success: false,
                    message: "Invalid quantity format!"
                });
            }

            const updatedCartItem = {
                quantity: numericQuantity,
                userID: userId,
                productID: productID
            };

            // Assuming you have a Cart model and the endpoint is for updating cart items
            const query = { userID: userId, productID: productID };
            const options = { new: true, upsert: true, setDefaultsOnInsert: true };
            const updatedItem = await Cart.findOneAndUpdate(query, updatedCartItem, options);

            console.log(`Cart item with userID ${userId} and productID ${productID} updated successfully:`, updatedItem);
            promises.push(updatedItem);
        }

        const updatedCartItems = await Promise.all(promises);

        res.json({
            success: true,
            message: "Cart items updated successfully",
            cartItems: updatedCartItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};



// const updateCart = async (req, res) => {
//     console.log(req.body);

//     const products = req.body.products;  // Update to match the incoming payload structure
//     const id = req.params.id;

//     if (!products || !Array.isArray(products)) {
//         return res.json({
//             success: false,
//             message: "Invalid payload format!"
//         });
//     }

//     try {
//         // Assuming you have a Cart model and the endpoint is for updating cart items
//         // Assuming each product in the array has a productID and quantity field
//         const promises = products.map(async (product) => {
//             const { productID, quantity } = product;
//             const updatedCartItem = {
//                 quantity: quantity
//             };

//             // Assuming you have a Cart model and the endpoint is for updating cart items
//             await Cart.findByIdAndUpdate(productID, updatedCartItem);
//             return updatedCartItem;
//         });

//         const updatedCartItems = await Promise.all(promises);

//         res.json({
//             success: true,
//             message: "Cart items updated successfully",
//             cartItems: updatedCartItems
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };


// const updateCart = async (req, res) => {
//     console.log(req.body);

//     const { quantity } = req.body;
//     const id = req.params.id;

//     if (!quantity) {
//         return res.json({
//             success: false,
//             message: "Quantity is required!"
//         });
//     }

//     try {
//         const updatedCartItem = {
//             quantity: quantity
//         };

//         // Assuming you have a Cart model and the endpoint is for updating cart items
//         await Cart.findByIdAndUpdate(id, updatedCartItem);

//         res.json({
//             success: true,
//             message: "Cart item updated successfully",
//             cartItem: updatedCartItem
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };




const removeFromCart = async (req, res) => {
    try {
        const removedFromCart = await Cart.findByIdAndRemove(
            req.params.id
        );

        if (!removedFromCart) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            data: removedFromCart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




// const removeFromCart = async (req, res) => {
//     try {
//         const removedFromCart = await Cart.findByIdAndDelete(req.params.id);
//         if (!removedFromCart) {
//             return res.json({
//                 success: false,
//                 message: "  product not found in cart!"
//             })
//         }

//         res.json({
//             success: true,
//             message: " removed from cart successfully"
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })
//     }

// }


module.exports = {
    addToCart,
    getCartByUserID,
    getCart,
    updateCart,
    removeFromCart

};