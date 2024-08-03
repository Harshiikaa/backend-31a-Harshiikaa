const router = require('express').Router()
// import gareko controller file ani ../ to get out of that folder
const userController = require("../controllers/userController")
const { authGuard } = require('../middleware/authGaurd')

// get route for login and register
// router.get('/create', userController.createUser)

router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/getUsers', userController.getAllUsers)
router.get('/getUser/:id', userController.getSingleUser)
router.put("/updateUser/:id", authGuard, userController.updateUser)
router.delete("/deleteUser/:id", authGuard, userController.deleteUser)
router.post("/resetPassword/:token", userController.resetPassword)
// send email Link For reset Password
router.post("/forgetPassword", userController.forgetPassword);


module.exports = router;