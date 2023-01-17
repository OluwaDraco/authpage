import { createOneUser } from "../model/db.js";

export const createOneController =async (req,res)=>{
    // const {id} = req.params;
    const {username, password} = req.body;
    try{
        const newUser = await createOneUser({username:username,password:password})
        console.log(newUser);
        res.status(200)
        return newUser;

    }catch(e){
        console.error(e)

    }

}