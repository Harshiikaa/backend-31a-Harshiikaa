const router = require('express').Router()
const productsController = require("../controllers/productsController");
const { authGuardSeller } = require('../middleware/authGaurd');



// create product API

router.get('/search/:key', productsController.search)
router.post('/createProduct', productsController.createProduct)
router.get('/getProducts', productsController.getAllProducts)
router.get("/getProduct/:id", productsController.getSingleProduct)
router.get("/getProductsBySellerApi/:id", productsController.getProductsBySellerID)

// router.get("/getProductsByCategory/category", productsController.getProductsByCategory)
router.get("/getProductsByAntiqueJewelry/category", productsController.getProductsByAntiqueJewelry)
router.get("/getProductsByEmbroideryandNeedlework/category1", productsController.getProductsByEmbroideryandNeedlework)
router.get("/getProductsByHomedecors/category2", productsController.getProductsByHomedecors)
router.get("/getProductsByPotteryandCeramics/category3", productsController.getProductsByPotteryandCeramics)
router.get("/getProductsByMusicalInstruments/category4", productsController.getProductsByMusicalInstruments)
router.get("/getProductsByArtsandPaintings/category5", productsController.getProductsByArtsandPaintings)
router.get("/getProductsByMasksandCostume/category6", productsController.getProductsByMasksandCostume)
router.get("/getProductsByMacrameandKnotting/category7", productsController.getProductsByMacrameandKnotting)
router.get("/getProductsByOthers/category8", productsController.getProductsByOthers)

router.put("/updateProduct/:id", authGuardSeller, productsController.updateProduct)
router.delete("/deleteProduct/:id", authGuardSeller, productsController.deleteProduct)


module.exports = router;