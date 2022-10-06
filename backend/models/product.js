const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
   name:{
      type:String,
      required:[true, 'Please enter your name'],
      trim:true,
      maxLength:[250,'Product name cannot exceed 250 characters.']
   },
   price:{
      type:Number,
      required:[true, 'Please enter price'],
      maxLength:[5,'Product price cannot exceed 5 characters.'],
      default:0.0
   },
   description:{
      type:String,
      required:[true, 'Please enter description'],
   },
   ratings:{
      type:Number,
      default:0
   },
   images:[
      {
         public_id:{
            type:String,
            required:true
         },
         url:{
            type:String,
            required:true
         }
      }
      
   ],
   categories:{
      type:String,
      required:[true,'Please select category for this product.'],
      enum:{
         values:[
            'Accessories',
            'Beauty/Health',
            'Books',
            'Cameras',
            'Clothes/Shoes',
            'Electronics',
            'Food',
            'Home',
            'Headphones',
            'Laptops',
            'Outdoor',
            'Sports'
         ],
         message:"Please select the correct category of product"
      }
   },
   seller:{
      type:String,
      required:[true, 'Please select seller for this product.'],
   },
   stock:{
      type:Number,
      required:[true, 'Please select stock for this product.'],
      maxLength:[5,'Product name cannot exceed 5 characters'],
      default:0
   },
   numOfReviews:{
      type:Number, 
      default:0
   },
   reviews:[
      {
         name:{
            type:String,
            required:true
         },
         comments:{
            type:String,
            required:true
         },
         rating:{
            type:Number,
            required:true
         }
      }
   ],
   created_at:{
      type:Date,
      default:Date.now
   }

})

module.exports = mongoose.model('Product',productSchema);