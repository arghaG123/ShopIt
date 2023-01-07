const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

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

   res.status(201).json({
      success: true,
      user
   });
})