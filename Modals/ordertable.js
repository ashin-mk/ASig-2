const mongoose=require("mongoose")
const OTab= new mongoose.Schema({
    inventory_id:String,
    customer_id:String,
    item_name:String,
    quantity:Number
})
const ordertable=mongoose.model("ordertable",OTab)
module.exports=ordertable