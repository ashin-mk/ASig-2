const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router=require("./Routes/routes")
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(3001,(err)=>{
    if(!err){
        console.log('connected successfully')

    }else{
        console.log("error connecting")
    }
})
//"mongodb+srv://Ashindeedu:ashin123@ashinmk.rxye7.mongodb.net/ecom?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost/webtechassignment",()=>{
    console.log("connected to mongodb")
},()=>{
    console.log("error connecting in mpongo db")
})
app.use("/",router)