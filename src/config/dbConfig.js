import mongoose from "mongoose";
import { MongoClient } from 'mongodb'

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);

    const con = await mongoose.connect(process.env.MONGO_CLIENT);
    con?.connections
      ? console.log("DB connected")
      : console.log("unable to connect mongo");
  } catch (error) {
    console.log(error);
  }
};

let client
let clientPromise
const options = {}
const uri = "mongodb+srv://admin:admin@cluster0.k4qvjoj.mongodb.net/ECommerceFeminal?retryWrites=true&w=majority"



if (!uri) {
  throw new Error('Please add mongo uri to .env file.')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = gloabal._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


export default clientPromise