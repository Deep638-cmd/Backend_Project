import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{type: String,  required: true},
   
     price:{type: String,  required: true},

})

const Service=mongoose.model("Service",Schema);
export default Service