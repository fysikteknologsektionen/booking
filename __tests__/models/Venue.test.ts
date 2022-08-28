import { set } from "date-fns";
import { Error } from "mongoose";
import VenueModel from "models/VenueModel";
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
  await VenueModel.create(venues);
});

describe("Timeslot", () => {
  test("throws if startDate is after endDate", async () => {
    const venue = await VenueModel.findById("259ebf28b0bfec8800e624f6")
      .orFail()
      .exec();
    const timeslot = venue.timeslots[0];
    timeslot.startDate = set(new Date(), { hours: 12, minutes: 0 });
    timeslot.endDate = set(new Date(), { hours: 11, minutes: 0 });
    await expect(venue.save()).rejects.toThrow(Error.ValidationError);
  });

  test("does not throw if startDate is after unset endDate", async () => {
    const venue = await VenueModel.findById("259ebf28b0bfec8800e624f6")
      .orFail()
      .exec();
    const timeslot = venue.timeslots[0];
    timeslot.startDate = set(new Date(), { hours: 12, minutes: 0 });
    timeslot.endDate = null;
    await expect(venue.save()).resolves.not.toThrow(Error.ValidationError);
  });

  test("throws if startTime is after endTime", async () => {
    const venue = await VenueModel.findById("259ebf28b0bfec8800e624f6")
      .orFail()
      .exec();
    const timeslot = venue.timeslots[0];
    timeslot.startTime = set(new Date(), { hours: 12, minutes: 0 });
    timeslot.endTime = set(new Date(), { hours: 11, minutes: 0 });
    await expect(venue.save()).rejects.toThrow(Error.ValidationError);
  });
});
