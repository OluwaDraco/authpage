import {config} from "dotenv";
import { MongoClient, ServerApiVersion } from 'mongodb';

config();

const mongo_uri = process.env.DATABASE_URI
console.log(process.env.DATABASE_URI);
const client = new MongoClient(mongo_uri,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// const users= client.db("twitter_bots").collection("users")

try{
    client.connect()
    console.log("up and running");
}

catch(e){
    console.error(e)
}
finally{
    client.close();
}

export async function getOneUser(username){
    try{
        const result = await client.db("twitter_bots").collection("users").findOne({"username":username})
        console.log("found")
        return result;
    }
    catch(e){
        console.error("User does not exist ");
    }

}

export async function createOneUser(username,password){
    try{
        const result = await client.db("twitter_bots").collection("users").insertOne(username,password);
        console.log("created");
    return result;
    }
    catch(e){
        console.log("can't create user")
    }
}

export async function updateOneUser(id,username,password){
    try{
        let user = await client.db("twitter_bots").collection("users").findOne(id)
        const result = await user.updateOne(username,password);
        console.log("updated")
        return result;
    }
    catch(e){
        console.error("Could not update user do to:",e);
    }
}

