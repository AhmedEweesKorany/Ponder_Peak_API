const express = require("express")
const postController = require("../controllers/postController")
const router = express.Router()
const authGurad = require("../middlewares/authMiddleware")

// user Routes
router.get('/all',authGurad,postController.getAllPosts)
router.post('/create',authGurad,postController.createPost)


module.exports = router 