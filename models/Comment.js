const mongoose = require('mongoose');
const {Schema} = mongoose

const CommentSchema  = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
  user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }

},{timestamps:true})





module.exports = mongoose.model('Comment', CommentSchema);    