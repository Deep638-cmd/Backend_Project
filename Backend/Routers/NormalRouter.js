import express from "express";
const router=express.Router();
import item from "../Models/NormalModel.js";
import {verify,generate} from "../Authentication.js"
router.post("/contact",verify,async(req,res)=>{
    try{
 const { name, email, massege } = req.body;

        // Basic validation
        if (!name || !email || !massege) {
            return res.status(400).json({ 
                error: "All fields are required" 
            });
        }
const model=new item({name, email,massege});
const newmodel=await model.save();
res.status(200).json(newmodel);
    } catch(err){
        console.log(err);
        res.status(500).json({err :"Internet issue"})
    }
})
router.get("/get",verify,async(req,res)=>{
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