const Post = require("../models/Post");
const bcrypt = require("bcryptjs")
const uploadPicture = require("../middlewares/uploadPictureMiddleware");
const fileRemover = require("../utils/fileRemover");


// get all posts
const getAllPosts = async(req,res,next)=>{

  try {
    let posts = await Post.find()
    return res.status(200).json({posts})
  } catch (error) {
      error.message = error.message || "internal server error"
      next(error)
    }
}


// create a new post 

const createPost = async(req,res,next)=>{ 
    try {
        const upload = uploadPicture.single("postImage")
        upload(req,res,async(err)=>{
          if(err){
            const error = new Error("unkonwn error uploading "+ err.message)
            next(error)
          }else{
          try {
            const user =req.id
            const {title,caption,slug,body,tags} = req.body
            const avatar = req.file.filename
            const post = new Post({
              title,
              avatar,
               caption,
               slug,
               body,
               tags,
               user
            })
            await post.save()
            return res.status(201).json({
              message: "post created successfully",
              post
            })
          } catch (error) {
            req.file.filename && fileRemover(req.file.filename)
            next(error)
          }
          }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getAllPosts,createPost
};
 