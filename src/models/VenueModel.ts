import { model, Model, models, Schema, Types } from "mongoose";

export interface Timeslot {
  name: string;
  startDate: Date;
  endDate?: Date | null;
  startTime: Date;
  endTime: Date;
}

const timeslotSchema = new Schema<Timeslot>({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    validate: {
      validator(this: Timeslot, value?: Date) {
        // If endDate is undefined we assume repeating forever
        if (!value) {
          return true;
        }
        return this.startDate < value;
      },
      message: "endDate must be after startDate if defined",
    },
  },
  startTime: { type: Date, required: true },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator(this: Timeslot, value: Date) {
        return this.startTime < value;
      },
      message: "endTime must be after startTime",
    },
  },
});

export interface Venue {
  name: string;
  description: string;
  timeslots: Timeslot[];
  managers: Types.ObjectId[];
}

// The following two types are used to correctly type Timeslot subdocuments
// See https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
type VenueDocumentOverrides = {
  timeslots: Types.DocumentArray<Timeslot>;
};

type VenueModelType = Model<Venue, {}, VenueDocumentOverrides>;

const venueSchema = new Schema<Venue, VenueModelType>({
  name: { type: String, required: true },
  description: String,
  timeslots: [timeslotSchema],
  managers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const VenueModel =
  (models.Venue as VenueModelType) ||
  model<Venue, VenueModelType>("Venue", venueSchema);

export default VenueModel;
