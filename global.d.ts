import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var mongoose: {
    conn: mongoose | null;
    promise: Promise<mongoose> | null;
  };
}
