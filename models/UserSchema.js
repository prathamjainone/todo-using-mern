import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false, // not showing in the response
    },},
    {
    timestamps:true
})

export const User=mongoose.model("User Schema", schema)
