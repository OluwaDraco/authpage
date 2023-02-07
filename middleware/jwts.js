import * as dotenv from "dotenv"
import jwt from "jsonwebtoken";
dotenv.config()

export const verifyJWT = (req,res,next) =>{
    //obtain the header from the req obj
    const token = req.headers.authorization.split(" ")[1]
    const SECRET_KEY = process.env.ACCESS_SECRET;

    //if there is no authHeader send a 401 code forbidden 
    if(!token){
        return res.status(401).send("Forbidden")
    }
//    const token = authHeader.split(' ')[1];
   console.log(token);
 
   try{
    const decoded = jwt.verify(token,SECRET_KEY);
    req.user = decoded.username
    console.log(req.user)
    console.log(`the username is:${decoded.username}`)
    console.log("verified")
    next();

   }
   catch(error)
   {
    res.status(400).send("Invalid Token")
   }
   
        
    }

   

