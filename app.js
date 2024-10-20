import express from 'express';
import UserRouters from './routers/UserRouters.js';
import TaskRouters from './routers/TaskRouters.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import { errormiddleware } from './middlewares/error.js';
import cors from 'cors';


export const app = express();
dotenv.config({
    path:'./database/config.env'
})

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:['GET', 'POST','PUT','DELETE']
}))

//routes
app.use("/api/v1/users", UserRouters);
app.use("/api/v1/tasks", TaskRouters);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(errormiddleware)