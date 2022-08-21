import { Types } from "mongoose";
import { IUser, Role } from "../../../models/User";

const users: (IUser & { _id: Types.ObjectId })[] = [
  {
    _id: new Types.ObjectId("4bd0f69444cd0eed19c8c326"),
    name: "John Doe",
    email: "john.doe@example.com",
    googleId: "98a79ecbc89dc44adc93569a1d44ae93",
    avatarUrl: "htts://example.com/avatar.png",
    role: Role.USER,
  },
  {
    _id: new Types.ObjectId("2b378f7a740f5ad24a85f83b"),
    name: "Jane Doe",
    email: "jane.doe@example.com",
    googleId: "8fcdf2b4bcfc821146e38b33d745438e",
    avatarUrl: undefined,
    role: Role.MANAGER,
  },
  {
    _id: new Types.ObjectId("1be6be623c1d211bed6952db"),
    name: "Richard Roe",
    email: "richard.roe@example.com",
    googleId: "80718d87020985d81df0b47327942135",
    avatarUrl: "htts://example.com/avatar.png",
    role: Role.MANAGER,
  },
  {
    _id: new Types.ObjectId("e1841eae9b1cef31287b707c"),
    name: "Judy Roe",
    email: "judy.roe@example.com",
    googleId: "566e2f51d0c9a88858dd121add68a620",
    avatarUrl: "htts://example.com/avatar.png",
    role: Role.ADMIN,
  },
];

export default users;
