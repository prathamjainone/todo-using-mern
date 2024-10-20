import mongoose from 'mongoose';

export const dbConnect=()=>mongoose.connect(process.env.MONGO_URI,{
    dbName:"Todo",
}).then(()=>console.log("Connected to MongoDB ")).catch((e)=>console.log(e))

