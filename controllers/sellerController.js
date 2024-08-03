const Sellers = require("../model/sellerModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary');

const createSeller = async (req, res) => {
    console.log(req.body)
    const { businessName, businessPhone, businessAddress, email, password } = req.body
    if (!businessName || !businessPhone || !businessAddress || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }
    try {
        const existingSeller = await Sellers.findOne({ email: email })
        if (existingSeller) {
            return res.json({
                success: false,
                message: "Seller already exists."
            })
        }
        const generatedSalt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, generatedSalt)
        const newSeller = new Sellers({
            businessName: businessName,
            businessPhone: businessPhone,
            businessAddress: businessAddress,
            email: email,
            password: encryptedPassword
        })
        await newSeller.save()
        res.status(200).json({
            success: true,
            message: "Seller created succesfully."
        })

    } catch (error) {
        res.status(500).json("Server Error")

    }
}

const loginSeller = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }
    try {
        const seller = await Sellers.findOne({ email: email })
        if (!seller) {
            return res.json({
                success: false,
                message: "Seller does not exist"
            })
        }
        const passwordToCompare = seller.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password does not match"

            })
        }
        const token = await jwt.sign(
            { id: seller._id },
            process.env.JWT_TOKEN_SECRET,
        )
        res.status(200).json({
            success: true,
            token: token,
            sellerData: seller,
            message: "Seller logged in successfully",

        })

    } catch (error) {
        console.log(error),
            res.json("Server Error")
    }
}


const getAllSellers = async (req, res) => {
    try {
        const listOfSellers = await Sellers.find();
        res.json({
            success: true,
            message: "Sellers fetched succesfully",
            sellers: listOfSellers
        })

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")

    }
}

const getSingleSeller = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            success: false,
            message: "Seller id is required!"
        })
    }
    try {
        const singleSeller = await Sellers.findById(id);
        res.json({
            success: true,
            message: "Sellers fetched successfully",
            seller: singleSeller

        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")

    }
}

const updateSeller = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const {
        businessName,
        businessPhone,
        businessAddress,
        email,

    } = req.body;
    const { sellerImage } = req.files;


    const id = req.params.id;
    if (!businessName
        || !businessPhone
        || !businessAddress
        || !email) {
        res.json({
            success: true,
            message: "All fields are required!"
        })
    }
    try {
        if (sellerImage) {
            const uploadedImage = await cloudinary.v2.uploader.upload(
                sellerImage.path,
                {
                    folder: "sellers",
                    crop: "scale"
                }
            )
            const updatedSeller = {
                businessName: businessName,
                businessPhone: businessPhone,
                businessAddress: businessAddress,
                email: email,
                sellerImage: uploadedImage.secure_url
            }
            await Sellers.findByIdAndUpdate(id, updatedSeller);
            res.json({
                success: true,
                message: "Seller updated successfully",
                seller: updatedSeller
            })
        }
        else {
            const updatedSeller = {
                businessName: businessName,
                businessPhone: businessPhone,
                businessAddress: businessAddress,
                email: email,
            }
            await Sellers.findByIdAndUpdate(id, updatedSeller);
            res.json({
                success: true,
                message: "Seller updated successfully without image",
                seller: updatedSeller
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

const deleteSeller = async (req, res) => {
    try {
        const deletedSeller = await Sellers.findByIdAndDelete(req.params.id);
        if (!deletedSeller) {
            return res.json({
                success: false,
                message: "Seller not found!"
            })
        }
        res.json({
            success: true,
            message: "Seller deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }

}

module.exports = { createSeller, loginSeller, getAllSellers, getSingleSeller, updateSeller, deleteSeller };



