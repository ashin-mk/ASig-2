const inventory=require("../Modals/inventorytable")
const User=require("../Modals/createuser")
const ordertable=require("../Modals/ordertable")
const mongoose=require("mongoose")
const express=require("express")
const router=express.Router()


router.post("/addinventory",async(req,res)=>{
    await inventory.insertMany(req.body)
    res.status(200).send("items added successfully")
})
router.post("/reguser",async(req,res)=>{
   const exemail= await User.find({email:req.body.email})
   if(exemail.length){
    res.status(400).send("Email already exist")

   }else{
    totusers= await User.find()
   const customer_id="OD"+`${1000+totusers.length}`
    await User.create({email:req.body.email,name:req.body.name,customer_id:customer_id})
    res.send("succesfully added")
   }
})
router.post("/buynow",async(req,res)=>{
   const email= await User.find({email:req.body.email})
    if(email.length){
       const item= await inventory.find({inventory_id:req.body.inventory_id}) 
       if(item.length ){
               if(item[0].available_quantity>=req.body.quantity){
                const setquantity=item[0].available_quantity-req.body.quantity
               await  inventory.updateOne({inventory_id:req.body.inventory_id},{available_quantity:setquantity})
               const order= await ordertable.find({ inventory_id:req.body.inventory_id,
                customer_id:email[0].customer_id,})
                if(order.length){
                    const quantity=order[0].quantity+req.body.quantity
                    await ordertable.updateOne({inventory_id:req.body.inventory_id,
                        customer_id:email[0].customer_id,},{quantity:quantity})
                        res.send("Successfully placed order")
                }else{
                    await  ordertable.create({
                        inventory_id:req.body.inventory_id,
                        customer_id:email[0].customer_id,
                        item_name:item[0].item_name,
                        quantity:req.body.quantity
                       })
                       res.send("Successfully placed order")
                }
               
               }else{
                res.send("Out of stock")
               }
       }else{
        res.send("No such item exists")
       }
    }else{
        res.send("no such email exists")
    }
})
router.get("/orderhistory",async(req,res)=>{
    const order= await ordertable.find({customer_id:req.body.customer_id,inventory_id:req.body.inventory_id})
    if(order.length){
    let nums=order[0].quantity
        res.send({number_of_orders_till_now:nums,customer_id:req.body.customer_id,inventory_id:req.body.inventory_id})}
        else{
            res.send("no such order exist")
        }
})
router.get("/getallinventories",async(req,res)=>{
    const data= await inventory.find()
    res.send(data)
})
router.get("/getordertable",async(req,res)=>{
    const data =await ordertable.find()
    res.send(data)
})
router.get("/getcustomertable",async(req,res)=>{
    const data =await User.find()
    res.send(data) 
})
///inventory/electronics —-get electronics items
// /inventory/ furniture   —--get furniture items

router.get("/inventory/electronics",async(req,res)=>{
    const data =await inventory.find({inventory_type:"Electronics"})
    res.send(data) 
})
router.get("/inventory/furniture",async(req,res)=>{
    const data =await inventory.find({inventory_type:"Furniture"})
    res.send(data) 
})
module.exports=router