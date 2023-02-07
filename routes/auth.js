import { Router } from "express";
import {getSingleUserController,createOneController,loginController} from "../controllers/controllers.js"
import {verifyJWT} from "../middleware/jwts.js"

const authRouter = Router();

authRouter.get("/getUsers",verifyJWT,getSingleUserController);

authRouter.post("/signup",createOneController);

authRouter.post("/login",loginController);





export default authRouter