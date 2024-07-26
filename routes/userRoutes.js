const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
const authGurad = require("../middlewares/authMiddleware")

router.post('/register',userController.registerUser)
router.post('/login',userController.login)
router.get("/all",userController.getAllusers)
router.get("/profile",authGurad,userController.userProfile)
router.put("/updateProfile",authGurad,userController.updateProfile)
router.put("/updateProfilePicture",authGurad,userController.updateProfilePicture)

module.exports = router 