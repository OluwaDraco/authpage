import { updateOneUser } from "../model/db.js";

export const updateSingleUserController = async (req,res) =>{
    const {username, password} = req.body;
    try{
        let updatedUser = await updateOneUser({username:username, password:password})
        res.status(200);
        console.log("username and password updated!")
        return updatedUser;
    }
    catch(e){
        console.error("An error occurred",e)
    }


}