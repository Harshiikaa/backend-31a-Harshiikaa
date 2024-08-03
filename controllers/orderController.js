const Order = require("../model/orderModel");

const createOrder = async (req, res) => {
    console.log(req.body);
    const id = req.user.id;

    // destructure data
    const {
        userID,
        productIDs,
        cartIDs,
        orderDate,
    } = req.body;

    // validate the data
    if (!userID || !productIDs || !cartIDs || !orderDate) {
        return res.json({
            success: false,
            message: "Please provide all the details",
        });
    }

    // try-catch block
    try {
        // Create a new order entry for each cartID
        const newOrders = await Promise.all(
            cartIDs.map(async (cartID, index) => {
                const newOrder = new Order({
                    userID: id,
                    productID: productIDs[index], // Assuming productIDs is an array of product IDs
                    cartID: cartID,
                    orderDate: orderDate,
                });
                // Save each new order
                await newOrder.save();
                return newOrder;
            })
        );

        res.status(200).json({
            success: true,
            message: "Your orders have been added. Check your order history",
            data: newOrders,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

// const getOrderByUserID = async (req, res) => {
//     const userID = req.user.id;
//     try {
//         // Find orders based on user ID
//         const orders = await Order.find({ userID: userID });

//         res.status(200).json({
//             success: true,
//             data: orders,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Server Error");
//     }
// };

const getOrderByUserID = async (req, res) => {
    const id = req.user.id;
    try {
        const userOrder = await Order.find().populate('productID', 'productName productPrice productCategory productDescription productImageURL');
        console.log(userOrder)
        res.json({
            message: "retrieved",
            success: true,
            orders: userOrder,
            // count: userFavorites.length,
        });
    } catch (e) {
        res.json({
            message: e,
            success: false,
        });
    }
};


module.exports = {
    createOrder,
    getOrderByUserID
};