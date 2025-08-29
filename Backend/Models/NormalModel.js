import mongoose from "mongoose";
const Schemas= new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true
       
    },
    massege:{
        type: String,
        require: true
    }
})
const models=mongoose.model("model",Schemas);
export default models