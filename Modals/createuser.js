const mongoose=require("mongoose")
const userschema= new mongoose.Schema({
  name:String,
  email:String,
  customer_id:String
})
const User=mongoose.model("User",userschema)
module.exports=User 