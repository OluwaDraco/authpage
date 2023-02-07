import * as dotenv from "dotenv"
import { getOneUser,updateOneUser } from "../model/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config()


export const loginController = async (req,res)=>{
    const {username,password} = req.body;
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const SECRET_REFRESH_KEY = process.env.REFRESH_SECRET;

    console.log(SECRET_KEY)



    // const encoded =(payload)=> {
    //     return jwt.sign({
    //         exp:Math.floor(Date.now()/1000) + 60 * 60 * 4,
    //         payload,
    //     },
    //     SECRET_KEY,
    //     )
    // };

    //  async function decoded(userJWT){
    //     return jwt.verify(userJWT,)
    //  }



    //check if the input is a valid username
    if(!username || typeof username !== "string"){
        res.status(400).json({error:"the format for the username is wrong,needs to be a string"})
        return
    }

    if(!password || typeof password !== "string"){
        res.status(400).json({error:"the format of the password is wrong, needs to be a string"})
        return 
    }

    try{
        let loginCredentials = await getOneUser({username:username});
    console.log(loginCredentials)
    if(!loginCredentials){
        res.status(400).json({error:"username was not found"})
    }
    //evaluate password using bcrypt 
    const passwordMatch = await bcrypt.compare(password, loginCredentials.password)
    if(passwordMatch){
        const accessJWT = jwt.sign(
            {"username":loginCredentials.username},
            SECRET_KEY,
            {expiresIn:'24h'},
        )

        const refreshJWT = jwt.sign(
            {"username":loginCredentials.username},
            SECRET_REFRESH_KEY,
            {expiresIn:'24h'},
        )

        await updateOneUser(loginCredentials.username,{"refreshJWT":refreshJWT});

        //add the refresh token field to the current user
        res.cookie('jwt',refreshJWT,{
            httpOnly:true,
            secure:true,
            maxAge:1000 * 60 *60 * 4 // 4 hours
        })
        res.status(201).json({success:true,token:accessJWT})

        console.log("login ");
    }
    else{
        res.status(401).json({error:"An incorrect password was provided."})
    }
    }
    catch(e){
        console.error(e)
    }

}