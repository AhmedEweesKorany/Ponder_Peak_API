const mongoose = require('mongoose');
const {Schema} = mongoose

const PostSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    body: {
        type: Object,
   required:true
    },
    avatar:{
        type: String,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:{
        type: [String],
    },
   
},{timestamps:true})





module.exports = mongoose.model('Post', PostSchema);    