const User = require("../models/User");
const bcrypt = require("bcryptjs")
// create user register function
const registerUser = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    // check if user is already registered
    let user = await User.findOne({ email });
    if (user) throw new Error("user already exists")

    const hashedPassword = await bcrypt.hash(password,10)
    // create a new user
    const newUser = await new User({ name, email, password: hashedPassword});
    await newUser.save();
    return res
      .status(201)
      .json({
        user: newUser,
        token: await newUser.generateJWT(),
        message: "user created successfully",
      });
  } catch (error) {
    next(error);
  }
};

// login endpoint 
const login = async (req, res, next) => {
try {
  const {email,password} = req.body;
  let user = await User.findOne({email})
  if(!user ) throw new Error(`User not found`)
  const isMatch =  await bcrypt.compare(password, user.password)
  if(!isMatch ) throw new Error(`Invalid Password`)
  return res.status(200).json({
      user,
      token: await user.generateJWT(),
      message: "login successful",
    });
 
} catch (error) {
  next(error);
  
}  
}

// get all users 
const getAllusers = async(req,res,next)=>{

  try {
    let user = await User.find().select("-password").lean()
    return res.status(200).json({user})
  } catch (error) {
      error.message = error.message || "internal server error"
      next(error)
    }
}

// get User Profile
const userProfile = async (req,res,next)=>{

  try {
    let user = await User.findById(req.id).select("-password").lean()
    if(!user ) throw new Error(`User not found`)
    return res.status(200).json({user})
  } catch (error) {
    next(error)
  }
}

// update profile 
const updateProfile = async (req,res,next)=>{
  try {
    const {name,email,avatar,newPassword,oldPassword} = req.body
    let user = await User.findById(req.id)

    if(!user) throw new Error(`User not found`)
    
    user.email = email || user.email
    user.name = name || user.name
    if(newPassword && newPassword.length <8) {
        throw new Error(`Password must be at least 8 characters`)
    }else{
      if(user.passwordCompare(oldPassword)){
        user.password = newPassword
      }else{
        throw new Error("invalid old password")
      }
    }

    const updatedUser = await user.save()
    res.status(200).json({data: updatedUser,message: "updated successfully"})
  } catch (error) {

    next(error)
    
  }
}
module.exports = {
  registerUser,
  getAllusers,
  login,userProfile,updateProfile
};
