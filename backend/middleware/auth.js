const jwt = require("jsonwebtoken");
const { request } = require("../app");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Check if user authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res,next) => {
   const {token} = req.cookies;

   if(!token){
      return next(new ErrorHandler('Login first to access this data',401));
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decoded.id);

   next();
})