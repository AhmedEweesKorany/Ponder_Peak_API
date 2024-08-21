const express = require("express")
const postController = require("../controllers/postController")
const router = express.Router()
const authGurad = require("../middlewares/authMiddleware")

// user Routes
router.get('/',postController.getAllPosts)
router.get("/:slug",postController.getPostBySlug)
router.post('/create',authGurad,postController.createPost)
router.put('/update/:slug',authGurad,postController.updatePost)
router.delete('/delete/:slug',authGurad,postController.deletePost)

module.exports = router  