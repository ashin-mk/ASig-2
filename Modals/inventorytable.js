const mongoose=require("mongoose")
const invschema= new mongoose.Schema({
    inventory_id:String,
    inventory_type:String,
    item_name:String,
    available_quantity:Number
})
const inventory=mongoose.model("Inventory",invschema)
module.exports=inventory 