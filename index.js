require('dotenv').config();
const { MongoClient, ServerApiVersion } =  require('mongodb');

const mongo_uri = process.env.DATABASE_URI
const client = new MongoClient(mongo_uri,{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})
 const main= ()=>{
    try{
        client.connect()
        console.log("up and running");
    }
    
    catch(e){
        console.error(e)
    }
    

 }

 main()
