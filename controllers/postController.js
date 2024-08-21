const Post = require("../models/Post");
const bcrypt = require("bcryptjs")
const uploadPicture = require("../middlewares/uploadPictureMiddleware");
const fileRemover = require("../utils/fileRemover");
const Comment = require("../models/Comment")

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
            const {title,caption,slug,body,tags} = JSON.parse(req.body.documnet)
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

// update post by slug
const updatePost = async(req,res,next)=>{
  try {
    const post = await Post.findOne({slug:req.params.slug})
    if(!post){
      const error = new Error("post not found")
      error.statusCode = 404
      next(error)
      return
    }
    const upload = uploadPicture.single("postImage")

    const handleUpdatePostData = async (data)=>{
      const {title,caption,slug,body,tags} = JSON.parse(data)
      post.title = title || post.title
      post.caption = caption || post.caption
      post.slug = slug || post.slug
      post.body = body || post.body
      post.tags = tags || post.tags
      const updatedPost = await post.save()
      return res.status(200).json({
        message: "post updated successfully",
        post: updatedPost
      })
    }

    upload(req,res,async (err)=>{
      if(err){
        const error = new Error("unkonwn error uploading "+ err.message)
        next(error)
      }else{
        if(req.file){ 
          if(post.avatar !== ""){
            fileRemover(post.avatar)
          }
          post.avatar = req.file.filename
          handleUpdatePostData(req.body.document)
          return;
        }
        handleUpdatePostData(req.body.document)
      }
    })    
  } catch (error) {
    next(error)
  }
}


// delete post by slug
const deletePost = async (req,res,next)=>{
  try {
    const post = await Post.findOne({slug:req.params.slug})
    if(!post){
      const error = new Error("post not found")
      error.statusCode = 404
      next(error)
      return
    }
    await Post.deleteOne({slug:req.params.slug})
    await Comment.deleteMany({post:post._id})
    res.status(200).json({
      message: "post deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPosts,createPost,updatePost,deletePost
};
 