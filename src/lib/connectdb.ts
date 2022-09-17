import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

/**
 * Connect mongoose to database.
 * @param uri Database uri. Defaults to environment variable DB_URI.
 * @returns (cached) mongoose connection.
 */
async function connectdb(uri: string | undefined = process.env.DB_URI) {
  if (!uri) {
    throw new Error("Cannot connect to db: no connection string provided");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectdb;
