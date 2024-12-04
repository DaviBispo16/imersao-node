import "dotenv/config";
import { ObjectId } from "mongodb";
import connectToDatabase from "../config/database";
import Post from "../types/Post"
import EnvironmentVariables from "../types/EnvironmentVariables";

const config: EnvironmentVariables = {
    databaseName: process.env.DATABASE_NAME || "",
    databaseCollection: process.env.DATABASE_COLLECTION || ""
}


export async function getAllPosts() {
    const db = await connectToDatabase(config.databaseName);
    const getPosts = db?.collection(config.databaseCollection).find().toArray();
    return getPosts;
}

export async function createOnePost(newPost: Post) {
    const db = await connectToDatabase(config.databaseName);
     return db?.collection(config.databaseCollection).insertOne(newPost); 
}

export async function updatePost(id: string, newPost: Post) {
    const db = await connectToDatabase(config.databaseName);
    const objectId = ObjectId.createFromHexString(id)
    return db?.collection(config.databaseCollection).updateOne({_id: new ObjectId(objectId)}, {$set: newPost});
}