import { set } from "date-fns";
import ReservationModel from "models/ReservationModel";
import UserModel from "models/UserModel";
import VenueModel from "models/VenueModel";
import { Error } from "mongoose";
import reservations from "__tests__/__fixtures__/reservations";
import users from "__tests__/__fixtures__/users";
import venues from "__tests__/__fixtures__/venues";
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
  await ReservationModel.create(reservations);
});

describe("Reservation model", () => {
  test("throws if startTime is after endTime", async () => {
    const reservation = await ReservationModel.findById(
      "634bcbe0864b0d66a5bafad0"
    )
      .orFail()
      .exec();
    reservation.startTime = set(new Date(), { hours: 18, minutes: 0 });
    reservation.endTime = set(new Date(), { hours: 16, minutes: 0 });
    await expect(reservation.save()).rejects.toThrow(Error.ValidationError);
  });
});
