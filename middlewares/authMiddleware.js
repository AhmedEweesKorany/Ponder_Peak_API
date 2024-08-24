const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authGurad = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {

        let token = req.headers.authorization.split(" ")[1];
        const { id } =  jwt.verify(token, process.env.JWT_SECRET);
        req.id = id
         next();
      } catch (error) {
        let err = new Error("not authorized,invalid token");
        err.statusCode = 401;
        next(err);
      }
    }else{
      let err = new Error("not authorized,no token");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    let err = new Error("not authorized,no token");
    err.statusCode = 404;
    next(err);
  }
};

const IsAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    if (user.admin) {
      next();
    } else {
      let err = new Error("you are not admin");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    let err = new Error("not authorized,no token");
    err.statusCode = 404;
    next(err);
  }
};

module.exports = {authGurad,IsAdmin};
