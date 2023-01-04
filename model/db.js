require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const mongo_uri = process.env.DATABASE_URI
console.log(process.env.DATABASE_URI);
const client = new MongoClient(mongo_uri,{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})

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