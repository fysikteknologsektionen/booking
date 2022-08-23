import type Mongoose from "mongoose";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

declare module "next-auth" {
  interface JWT extends DefaultJWT {
    name?: string | null;
    image?: string | null;
    sub?: string;
  }
  interface Session extends DefaultSession {
    user?: {
      id?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
