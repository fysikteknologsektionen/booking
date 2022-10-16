import { Reservation, Status } from "models/ReservationModel";
import { Types } from "mongoose";
import { set } from "date-fns";

const reservations: (Reservation & { _id: Types.ObjectId })[] = [
  {
    _id: new Types.ObjectId("634bcbe0864b0d66a5bafad0"),
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    clientDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    venue: new Types.ObjectId("259ebf28b0bfec8800e624f6"),
    date: new Date(),
    startTime: set(new Date(), { hours: 18, minutes: 0 }),
    endTime: set(new Date(), { hours: 20, minutes: 0 }),
    status: Status.ACCEPTED,
  },
  {
    _id: new Types.ObjectId("634bccecfee49918f0ee9e77"),
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    clientDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    venue: new Types.ObjectId("259ebf28b0bfec8800e624f6"),
    date: new Date(),
    startTime: set(new Date(), { hours: 16, minutes: 0 }),
    endTime: set(new Date(), { hours: 18, minutes: 0 }),
    status: Status.DENIED,
  },
  {
    _id: new Types.ObjectId("634bcc85a71181ce6a458410"),
    clientName: "John Roe",
    clientEmail: "john.roe@example.com",
    clientDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    venue: new Types.ObjectId("a524cc2ad81830bf067ba1a4"),
    date: new Date(),
    startTime: set(new Date(), { hours: 17, minutes: 30 }),
    endTime: set(new Date(), { hours: 21, minutes: 0 }),
    status: Status.PENDING,
  },
];

export default reservations;
