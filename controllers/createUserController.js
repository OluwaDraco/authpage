import { createOneUser } from "../model/db.js";
import bcrypt from "bcrypt"

export const createOneController =async (req,res)=>{
    // const {id} = req.params;
    const {username, password} = req.body;
    //use a regular expression to make sure the first character in the user name is "@"
    let errors = {}
    if(!username || !password){
        res.status(400).json({errors:"username or/and password requried."})
    }
    if( password.length < 8) {
        errors.password = "Sorry the password length must be at least 8 characters long  "
    }
    //check if the first char is an "@" symbol
    if(username[0] !== "@"){
        res.status(400).json({errors:"username must start with the @ symbol."})

    }
    const hashPassword = await bcrypt.hash(password,10)

    try{
        const newUser = await createOneUser({username:username,password:hashPassword})
        console.log(newUser);
        res.status(200)
    }catch(e){
        console.error(e)

    }

}