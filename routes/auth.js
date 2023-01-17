import { Router } from "express";
import bcrypt from "bcryptjs"
import {getSingleUserController,createOneController,updateSingleUserController} from "../controllers/controllers.js"

const authRouter = Router();

authRouter.get("/",getSingleUserController);

authRouter.post("/signup",createOneController);

authRouter.put("/update-info",updateSingleUserController);




export default authRouter