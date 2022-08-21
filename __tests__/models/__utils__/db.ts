import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectdb from "../../../lib/connectdb";

let mongo: MongoMemoryServer;

export async function dbUp(): Promise<void> {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await connectdb(uri);
}

export async function dbDown(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}
