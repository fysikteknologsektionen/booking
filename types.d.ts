import { Role } from "models/User";
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
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image?: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub: string;
    name: string;
    image?: string;
    role: Role;
  }
}
