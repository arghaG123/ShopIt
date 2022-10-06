const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
   const product = await Product.create(req.body);

   res.status(201).json({
      success:true,
      product
   });
});
// Get all products from the database => /api/v1/admin/products?keyword=apple
exports.getProducts = catchAsyncErrors (async(req,res,next) => {
   const apiFeatures = new APIFeatures(Product.find(),req.query)
                           .search()
                           .filters();
   const products = await apiFeatures.query;
   return res.status(200).json({
      success:true,
      count:products.length,
      products
   })
});

// Get all products from the database => /api/v1/products/:id 

exports.getSingleProducts = catchAsyncErrors (async(req,res,next) => {
   const products = await Product.findById(req.params.id);
   if(!products){
      return next(new ErrorHandler('Product not found',404))
   }
   res.status(200).json({
      success:true,
      products
   })
});

// Update product => /api/v1/admin/products/:id

exports.updateProduct = catchAsyncErrors (async(req,res,next) => {
   let product = await Product.findById(req.params.id);
   
   if(!product){
      return next(new ErrorHandler('Product not found',404))
   }
   product = await Product.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true,
      useFindAndModify: true
   });
   res.status(200).json({
      success:true,
      product
   })
});

// Delete product => /api/v1/admin/products/:id

exports.deleteProduct = catchAsyncErrors (async(req,res,next) => {
   let product = await Product.findById(req.params.id);
   if(!product){
      return next(new ErrorHandler('Product not found',404))
   }

   await Product.deleteOne();
   res.status(200).json({
      success:true,
      message: 'Product successfully removed successfully'
   })
});