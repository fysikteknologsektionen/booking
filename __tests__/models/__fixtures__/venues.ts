import { set } from "date-fns";
import { Types } from "mongoose";
import { IVenue } from "../../../models/Venue";

const venues: (IVenue & { _id: Types.ObjectId })[] = [
  {
    _id: new Types.ObjectId("259ebf28b0bfec8800e624f6"),
    name: "Focus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    timeslots: [
      {
        name: "Booking slot 1",
        weekdays: [1, 3, 5],
        startTime: set(new Date(), { hours: 17, minutes: 30 }),
        endTime: set(new Date(), { hours: 22, minutes: 0 }),
      },
      {
        name: "Booking slot 2",
        weekdays: [0, 2, 4, 6],
        startTime: set(new Date(), { hours: 12, minutes: 0 }),
        endTime: set(new Date(), { hours: 15, minutes: 0 }),
      },
    ],
    managers: [
      new Types.ObjectId("2b378f7a740f5ad24a85f83b"),
      new Types.ObjectId("1be6be623c1d211bed6952db"),
    ],
  },
  {
    _id: new Types.ObjectId("a524cc2ad81830bf067ba1a4"),
    name: "Nexus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    timeslots: [
      {
        name: "Booking slot 1",
        weekdays: [1, 3, 5],
        startTime: set(new Date(), { hours: 17, minutes: 30 }),
        endTime: set(new Date(), { hours: 22, minutes: 0 }),
      },
      {
        name: "Booking slot 2",
        weekdays: [0, 2, 4, 6],
        startTime: set(new Date(), { hours: 12, minutes: 0 }),
        endTime: set(new Date(), { hours: 15, minutes: 0 }),
      },
    ],
    managers: [new Types.ObjectId("2b378f7a740f5ad24a85f83b")],
  },
];

export default venues;
