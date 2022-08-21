import { model, Model, models, Schema, Types } from "mongoose";

export interface ITimeslot {
  name: string;
  weekdays: number[];
  startTime: Date;
  endTime: Date;
}

export interface IVenue {
  name: string;
  description: string;
  timeslots: ITimeslot[];
  managers: Types.ObjectId[];
}

const timeslotSchema = new Schema<ITimeslot>({
  name: { type: String, required: true },
  weekdays: [{ type: Number, required: true, min: 0, max: 6 }],
  startTime: { type: Date, required: true },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator(this: ITimeslot, value: Date) {
        return this.startTime < value;
      },
      message: "endTime must be after startTime",
    },
  },
});

const venueSchema = new Schema<IVenue>({
  name: { type: String, required: true },
  description: String,
  timeslots: [timeslotSchema],
  managers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Venue =
  (models.Venue as Model<IVenue>) || model<IVenue>("Venue", venueSchema);

export default Venue;
