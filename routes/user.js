import { Router } from "express";
const userRouter = Router();


userRouter.get("/",(req,res)=>{
    res.send("this is the user route")
})

export default userRouter;