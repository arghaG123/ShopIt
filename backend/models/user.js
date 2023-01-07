const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required: [true,'Please enter your name'],
      maxlength:[30,'Your name must be at most 30 characters']
   },
   email:{
      type: String,
      required: [true,'Please enter your email'],
      unique: true,
      validate:[validator.isEmail,'Please enter a valid email']
   },
   password:{
      type: String,
      required: [true,'Please enter your password'],
      minlength: [8,'Please enter atleast 8 characters'],
      select:false
   },
   avatar:{
      public_id:{
         type: String,
         required: true
      },
      url:{
         type: String,
         required: true
      }
   },
   role:{
      type: String,
      default: 'user'
   },
   created_at:{
      type: Date,
      default: Date.now()
   },
   resetPasswordToken:String,
   resetPasswordExpires:Date,
});

//Encrypting password before saving user to database

userSchema.pre('save',async function(next){
   if(!this.isModified('password')){
      next();
   }
   this.password = await bcrypt.hash(this.password,10);
});
module.exports = mongoose.model('User',userSchema);