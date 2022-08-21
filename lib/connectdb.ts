import mongoose from "mongoose";

const { DB_URI } = process.env;

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

/**
 * Connect mongoose to database.
 * @param db_uri Database uri.
 * @returns (cached) mongoose connection.
 */
async function connectdb(db_uri: string | undefined = DB_URI) {
  if (!db_uri) {
    throw new Error("Cannot connect to db: no connection string provided");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(db_uri, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectdb;
