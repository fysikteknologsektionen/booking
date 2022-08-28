import UserModel, { Role } from "models/UserModel";
import VenueModel from "models/VenueModel";
import users from "../__fixtures__/users";
import venues from "../__fixtures__/venues";
import { dbDown, dbDropCollections, dbUp } from "../__utils__/db";

beforeAll(async () => {
  await dbUp();
});

afterAll(async () => {
  await dbDown();
});

beforeEach(async () => {
  await dbDropCollections();
  await UserModel.create(users);
  await VenueModel.create(venues);
});

describe("User model", () => {
  test("removes user as manager if role is changed", async () => {
    const userId = "2b378f7a740f5ad24a85f83b";

    // Should be manager by default
    let docs = await VenueModel.find().select({ managers: 1 }).lean().exec();
    docs.forEach((doc) => {
      expect(doc.managers.map((id) => id.toString())).toContain(userId);
    });

    // Now change role
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new Error("Cannot find user.");
    }
    user.role = Role.USER;
    await user.save();

    // Should no longer be manager
    docs = await VenueModel.find().select({ managers: 1 }).lean().exec();
    docs.forEach((doc) => {
      expect(doc.managers).not.toContain(userId);
    });
  });
});
