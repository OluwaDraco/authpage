import {getOneUser} from "../model/db.js";

export const getSingleUserController= async (req,res) =>{
    const {username} = req.body
    try{
        const user = await getOneUser({username:username});
        console.log(user)

         return user
         
    
    }

    catch(e){
        console.log("error");
    }
    

}

