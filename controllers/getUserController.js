import {getOneUser} from "../model/db.js";

export const getSingleUserController= async (req,res) =>{
    const username = req.body
    console.log({username:username} instanceof Promise)
    try{
        const user = await getOneUser({"username":username});
        console.log({username:username} instanceof Promise)
        console.log(user.username)
        console.log(user.password)
         res.status(200)
         return user
    
    }

    catch(e){
        console.log("error");
    }
    

}

