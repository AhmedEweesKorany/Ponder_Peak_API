const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar:{
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        required: false,
    }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);    