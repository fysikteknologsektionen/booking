import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

export async function dbUp(): Promise<void> {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  // Set env var so that correct connection is fetched in tests
  process.env.DB_URI = uri;
  await mongoose.connect(uri);
}

export async function dbDown(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}

export async function dbDropCollections() {
  if (!mongo) {
    return;
  }
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => {
    await collection.drop();
  });
}
