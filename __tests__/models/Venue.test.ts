import { set } from "date-fns";
import Venue from "../../models/Venue";
import venues from "./__fixtures__/venues";
import { dbDown, dbUp } from "./__utils__/db";

beforeEach(async () => {
  await dbUp();
  await Venue.create(venues);
});

afterEach(async () => {
  await dbDown();
});

test("throws if timeslot startTime is after endTime", async () => {
  const venue = await Venue.findById("259ebf28b0bfec8800e624f6")
    .select({ timeslots: 1 })
    .exec();
  if (!venue) {
    throw new Error("Cannot find venue.");
  }
  const timeslot = venue.timeslots[0];
  timeslot.startTime = set(new Date(), { hours: 12, minutes: 0 });
  timeslot.endTime = set(new Date(), { hours: 11, minutes: 0 });
  expect(venue.save).toThrowError();
});
