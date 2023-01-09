const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.registerUser = catchAsyncErrors(async (req,res,next) =>{
   const {name, email, password} = req.body;

   const user = await User.create({
      name:name,
      email:email,
      password:password,
      avatar:{
         public_id:'310819',
         url:'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__340.png',
      }
   })
   const token = user.getJwtToken();
   res.status(201).json({
      success: true,
      token
   });
})

// Loginn user => /login
exports.loginUser = catchAsyncErrors(async (req,res,next) =>{
   const {email,password} = req.body;
   //Check if email and password is entered by user
   if(!email || !password){
      return next(new ErrorHandler('Please enter email or password',400));
   }

   //Finding user in database
   const user = await User.findOne({email: email}).select('+password');

   if(!user){
      return next(new ErrorHandler('Invalid email or password',401));
   }

   // Check if password is correct
   const checkUserPassword = await user.comparePassword(password);

   if(!checkUserPassword){
      return next(new ErrorHandler('Invalid email or password',401));
   }
   const token = user.getJwtToken();
   res.status(200).json({
      success: true,
      token
   });
}) 