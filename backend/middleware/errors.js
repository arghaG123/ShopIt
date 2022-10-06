const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res, next) => {
   err.statusCode = err.statusCode || 500;
   if(process.env.NODE_ENV === 'DEVELOPEMENT'){
      res.status(err.statusCode).json({
         success: false,
         error: err,
         errMessage: err.message,
         stack: err.stack
      })
   }

   if(process.env.NODE_ENV === 'PRODUCTION'){
      let error = {...err};
      error.message = err.message;
      // Wrong mongoose object Id error
      if(err.name ==='CastError'){
         const message = `Resource not found, Invalid :${err.path}`;
         error = new ErrorHandler(message,400)
      }
      // Mongoose validation error
      if(err.name ==='ValidationError'){
         const message = Object.values(err.errors).map(val => val.message)
         error = new ErrorHandler(message,400)
      }
      res.status(error.statusCode).json({
         success: false,
         error: error.message || 'Internal Server Error'
      })
   }
}