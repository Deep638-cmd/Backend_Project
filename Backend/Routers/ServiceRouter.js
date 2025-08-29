import express from "express";
const router=express.Router();
import item from "../Models/Service.js";
router.post("/post",async(req,res)=>{
    try{
        const{title,description,price}=req.body;
        const models=new item({title,description,price});
        const newmodel=await models.save();
        console.log(newmodel);
        res.status(200).json(newmodel)

    } catch(err){
        console.log(err);
    }
})
router.get("/get",async(req,res)=>{
    try{
       const data=await item.find()
console.log(data);
res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(500).json({err: "Internet issue"});
    }
})
export default router;