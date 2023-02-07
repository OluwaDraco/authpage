import {config} from "dotenv";
import { MongoClient, ServerApiVersion } from 'mongodb';

config();

const mongo_uri = process.env.DATABASE_URI
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
        const result = await client.db("twitter_bots").collection("users").findOne(username) 
        return result
    }
    catch(e){
        console.error(e);
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

export async function updateOneUser(username,dataToBeUpdated){
    try{
        let result = await client.db("twitter_bots").collection("users").updateOne(
            {username:username},
            {$set:dataToBeUpdated}
        )
        console.log("updated")
        return result;
    }
    catch(e){
        console.error("Could not update user do to:",e);
    }
}

