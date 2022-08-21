import User, { Role } from "../../models/User";
import Venue from "../../models/Venue";
import users from "./__fixtures__/users";
import venues from "./__fixtures__/venues";
import { dbDown, dbUp } from "./__utils__/db";

beforeEach(async () => {
  await dbUp();
  await User.create(users);
  await Venue.create(venues);
});

afterEach(async () => {
  await dbDown();
});

test("removed as venue manager if role gets changed", async () => {
  const userId = "2b378f7a740f5ad24a85f83b";

  // Should be manager by default
  let docs = await Venue.find().select({ managers: 1 }).lean().exec();
  docs.forEach((doc) => {
    expect(doc.managers.map((id) => id.toString())).toContain(userId);
  });

  // Now change role
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("Cannot find user.");
  }
  user.role = Role.USER;
  await user.save();

  // Should no longer be manager
  docs = await Venue.find().select({ managers: 1 }).lean().exec();
  docs.forEach((doc) => {
    expect(doc.managers).not.toContain(userId);
  });
});
