const bcrypt = require("bcryptjs")
const uploadPicture = require("../middlewares/uploadPictureMiddleware");
const fileRemover = require("../utils/fileRemover");
const Comment = require("../models/Comment");
const User = require("../models/User");

// get all posts
const getPostComment = async(req,res,next)=>{

  try {
    const comments = await Comment.find({post:req.params.id}).populate([
      {
        path: "user",
         select: ["name","avatar","verified"]
        }

    ])

    return res.status(200).json({comments}) 
  } catch (error) {
      error.message = error.message || "internal server error"
      next(error)
    }
}

// get all comments
const getAllComments = async(req,res,next)=>{
    try {
        const user = await User.findById(req.id)
        if(user.admin){
            const comments = await Comment.find().populate([
                {
                  path: "user",
                   select: ["name","avatar","verified"]
                  },
                {
                    path: "post",
                     select: ["title","avatar"]
                    
                }
                ])
                  return res.status(200).json({comments})
                }else{
                    const comments = await Comment.find({user:req.id}).populate([
                        {
                          path: "user",
                           select: ["name","avatar","verified"]
                          }
                          ,
                          {
                              path: "post",
                               select: ["title","avatar"]
                              
                          }
                        ])
                          return res.status(200).json({comments})
                }
        }
            catch (error) {
                error.message = error.message || "internal server error"
                next(error)
            }
}
// create a new comment
const createComment = async(req,res,next)=>{
    try {
        const {content,postId} = req.body
        const user = req.id
        const comment = new Comment({
            content,
             user,
             post:postId
        })
        await comment.save()
        return res.status(201).json({
            message: "comment created successfully",
            comment
        })
    } catch (error) {
        next(error)
    }
}

// delete comment by id
const deleteComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            const error = new Error("comment not found")
             error.statusCode = 404
             next(error)
             return
        }
        await Comment.deleteOne({_id:req.params.id})
        res.status(200).json({
            message: "comment deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

// update comment by id
const updateComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            const error = new Error("comment not found")
             error.statusCode = 404
             next(error)
             return
        }
        const {content} = req.body
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{content},{new:true})
        res.status(200).json({
            message: "comment updated successfully",
            updatedComment
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getPostComment,createComment,deleteComment,updateComment,getAllComments
};
 