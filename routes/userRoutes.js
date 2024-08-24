const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
const {authGurad,IsAdmin} = require("../middlewares/authMiddleware")

// user Routes
router.post('/register',userController.registerUser)
router.post('/login',userController.login)
router.get("/all",authGurad ,userController.getAllusers)
router.get("/profile",authGurad,userController.userProfile)
router.put("/updateProfile",authGurad,userController.updateProfile)
router.put("/updateProfilePicture",authGurad,userController.updateProfilePicture)
router.delete("/delete/:id",authGurad,IsAdmin,userController.deleteUser)
router.get("/makeVreified/:id",authGurad,IsAdmin,userController.makeVreified)
router.get("/makeAdmin/:id",authGurad,IsAdmin,userController.makeAdmin)

module.exports = router 