import {app} from "./app.js"
import { dbConnect } from "./database/db.js";

dbConnect();
app.listen(process.env.PORT,()=>{
    console.log("Server running on port "+ process.env.PORT + ` in ${process.env.NODE_ENV} mode`);
})