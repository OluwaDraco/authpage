import express from "express"
import helmet from "helmet"
import morgan from "morgan";
import {config} from "dotenv";
config()
const app = express()
app.use(express.json())
app.use(helmet());
app.use(morgan("combined"));
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";



app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
//middleware functions




const PORT = process.env.PORT || 5000
//creates the server using the port variable from above 
app.listen(PORT,()=>{
    console.log("backend server is running .......")
})