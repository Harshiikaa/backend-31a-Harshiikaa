const Products = require('../model/productModel');
const cloudinary = require('cloudinary');


const search = async (req, res) => {
    let data = await Products.find(
        {
            "$or": [
                { productName: { $regex: req.params.key } },
                { productCategory: { $regex: req.params.key } },
                // { productDescription: { $regex: req.params.key } }
            ]
        }

    )
    res.send(data)
}


const createProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    // destructure data 
    const { productName,
        productPrice,
        productDescription,
        productCategory,
        sellerID } = req.body;
    const { productImage } = req.files;

    // validate ht edata 
    if (!productName || !productPrice || !productDescription || !productCategory || !productImage || !sellerID)
        return res.json({
            success: false,
            message: "Please fill all the fields"
        })

    // try catch block 
    try {
        const uploadedImage = await cloudinary.v2.uploader.upload(
            productImage.path,
            {
                folder: 'products',
                crop: "scale"
            }
        )
        const newProduct = new Products({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productCategory: productCategory,
            productImageURL: uploadedImage.secure_url,
            sellerID: sellerID

        })
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "Product created succesfully",
            data: newProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")

    }
}

// function to get all the products
const getAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Products.find();
        res.json({
            success: true,
            message: "Products fetched successfully",
            products: listOfProducts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")

    }

}

const getProductsBySellerID = async (req, res) => {
    const id = req.params.id;
    try {
        // console.log(id);

        const sellersProducts = await Products.find({ sellerID: id });
        console.log(sellersProducts);
        //   console.log(mentorSessions);
        res.json({
            message: "retrieved",
            success: true,
            products: sellersProducts,
            // count: sellersProducts.length,
        });
    } catch (e) {
        res.json({
            message: "error",
            success: false,
        });
    }
};

// const getProductsByCategory = async (req, res) => {
//     const category = "Antique Jewelry";

//     try {
//         const categoryProducts = await Products.find({ productCategory: category });

//         res.json({
//             message: "Products fetched successfully by Antique Jewelry",
//             success: true,
//             products: categoryProducts,
//         });
//     } catch (error) {
//         res.json({
//             message: "Error fetching products by Antique Jewelry",
//             success: false,
//         });
//     }
// };

const getProductsByAntiqueJewelry = async (req, res) => {
    const category = "Antique Jewelry";

    try {
        const categoryProducts = await Products.find({ productCategory: category });

        res.json({
            message: "Products fetched successfully by Antique Jewelry",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Antique Jewelry",
            success: false,
        });
    }
};

const getProductsByEmbroideryandNeedlework = async (req, res) => {
    const category1 = "Embroidery and Needle-work";

    try {
        const categoryProducts = await Products.find({ productCategory: category1 });

        res.json({
            message: "Products fetched successfully by Embroidery and Needle-work",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Embroidery and Needle-work",
            success: false,
        });
    }
};


const getProductsByHomedecors = async (req, res) => {
    const category2 = "Home decors";

    try {
        const categoryProducts = await Products.find({ productCategory: category2 });

        res.json({
            message: "Products fetched successfully by Home decors",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Home decors",
            success: false,
        });
    }
};



const getProductsByPotteryandCeramics = async (req, res) => {
    const category3 = "Pottery and Ceramics";

    try {
        const categoryProducts = await Products.find({ productCategory: category3 });

        res.json({
            message: "Products fetched successfully by Pottery and Ceramics",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Pottery and Ceramics",
            success: false,
        });
    }
};


const getProductsByMusicalInstruments = async (req, res) => {
    const category4 = "Musical Instruments";

    try {
        const categoryProducts = await Products.find({ productCategory: category4 });

        res.json({
            message: "Products fetched successfully by Musical Instruments",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Musical Instruments",
            success: false,
        });
    }
};



const getProductsByArtsandPaintings = async (req, res) => {
    const category5 = "Arts and Paintings";

    try {
        const categoryProducts = await Products.find({ productCategory: category5 });

        res.json({
            message: "Products fetched successfully by Arts and Paintings",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Arts and Paintings",
            success: false,
        });
    }
};


const getProductsByMasksandCostume = async (req, res) => {
    const category6 = "Masks and Costume";

    try {
        const categoryProducts = await Products.find({ productCategory: category6 });

        res.json({
            message: "Products fetched successfully by Masks and Costume",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Masks and Costume",
            success: false,
        });
    }
};


const getProductsByMacrameandKnotting = async (req, res) => {
    const category7 = "Macrame and Knotting";

    try {
        const categoryProducts = await Products.find({ productCategory: category7 });

        res.json({
            message: "Products fetched successfully by Macrame and Knotting",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Macrame and Knotting",
            success: false,
        });
    }
};


const getProductsByOthers = async (req, res) => {
    const category8 = "Others";

    try {
        const categoryProducts = await Products.find({ productCategory: category8 });

        res.json({
            message: "Products fetched successfully by Others",
            success: true,
            products: categoryProducts,
        });
    } catch (error) {
        res.json({
            message: "Error fetching products by Others",
            success: false,
        });
    }
};






// function to get single product
const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            success: false,
            message: "Product id is required!"
        })
    }
    try {
        const singleProduct = await Products.findById(id).populate("sellerID", "businessName");
        res.json({
            success: true,
            message: "Products fetched successfully",
            product: singleProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")

    }
}

const getUserProductPagination = async (req, res) => {
    const requestPage = req.query.page;
    const resultPerPage = 4;
    try {
        const products = await Products.find({})
            .skip((requestPage - 1) * resultPerPage)
            .limit(resultPerPage);

        const totalProductsCount = await Products.countDocuments();
        if (products.length === 0) {
            return res.json({
                success: false,
                message: "No product found"
            });
        }
        res.json({
            success: true,
            products: products,
            totalPages: Math.ceil(totalProductsCount / resultPerPage),
        });
    } catch (error) {
        console.log(error);
        res.json(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

// function to update the product
const updateProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const {
        productName,
        productPrice,
        productCategory,
        productDescription

    } = req.body;
    const { productImage } = req.files;


    const id = req.params.id;
    if (!productName
        || !productPrice
        || !productCategory
        || !productDescription
    ) {
        res.json({
            success: true,
            message: "All fields are required!"
        })
    }
    try {
        if (productImage) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder: "products",
                    crop: "scale"
                }
            )
            const updatedProduct = {
                productName: productName,
                productPrice: productPrice,
                productCategory: productCategory,
                productDescription: productDescription,
                productImageURL: uploadedImage.secure_url
            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product uploaded successfully",
                product: updatedProduct
            })
        }
        else {
            const updatedProduct = {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productCategory: productCategory,

            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product updated successfully without image",
                product: updatedProduct
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }

}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.json({
                success: false,
                message: "Product not found!"
            })
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

}

module.exports = {
    search,
    createProduct,
    getAllProducts,
    getProductsBySellerID,
    getProductsByAntiqueJewelry,
    getProductsByEmbroideryandNeedlework,
    getProductsByHomedecors,
    getProductsByPotteryandCeramics,
    getProductsByMusicalInstruments,
    getProductsByArtsandPaintings,
    getProductsByMasksandCostume,
    getProductsByMacrameandKnotting,
    getProductsByOthers,
    getUserProductPagination,
    getSingleProduct,
    updateProduct,
    deleteProduct
};