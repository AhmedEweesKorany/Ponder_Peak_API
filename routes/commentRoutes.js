const express = require("express")
const commentController = require("../controllers/commentController")
const router = express.Router()
const authGurad = require("../middlewares/authMiddleware")

// user Routes
router.get('/:id',commentController.getPostComment)
// router.get("/:slug",commentController.getPostBySlug)
router.post('/create',authGurad,commentController.createComment)
router.put('/update/:id',authGurad,commentController.updateComment)
router.delete('/delete/:id',authGurad,commentController.deleteComment)

module.exports = router  