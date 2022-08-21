import { Model, model, models, Schema } from "mongoose";
import Venue from "./Venue";

export enum Role {
  USER,
  MANAGER,
  ADMIN,
}

export interface IUser {
  name: string;
  email: string;
  googleId: string;
  avatarUrl?: string;
  role: Role;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  googleId: { type: String, required: true },
  avatarUrl: String,
  role: { type: Number, default: Role.USER, enum: Role },
});

/**
 * Remove user as manager from venues if role has been changed.
 */
// eslint-disable-next-line func-names
userSchema.pre("save", async function () {
  if (this.isDirectModified("role") && this.role !== Role.MANAGER) {
    await Venue.updateMany(
      { managers: this.id },
      {
        $pull: {
          managers: this.id,
        },
      }
    ).exec();
  }
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
