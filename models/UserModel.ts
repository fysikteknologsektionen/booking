import { Model, model, models, Schema } from "mongoose";
import VenueModel from "./VenueModel";

export enum Role {
  USER,
  MANAGER,
  ADMIN,
}

export interface User {
  name: string;
  email: string;
  googleId: string;
  image?: string;
  role: Role;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  googleId: { type: String, required: true },
  image: String,
  role: { type: Number, default: Role.USER, enum: Role },
});

/**
 * Remove user as manager from venues if role has been changed.
 */
// eslint-disable-next-line func-names
userSchema.pre("save", async function () {
  if (this.isDirectModified("role") && this.role !== Role.MANAGER) {
    await VenueModel.updateMany(
      { managers: this.id },
      {
        $pull: {
          managers: this.id,
        },
      }
    ).exec();
  }
});

const UserModel =
  (models.User as Model<User>) || model<User>("User", userSchema);

export default UserModel;
