import { Model, model, models, Schema, Types } from "mongoose";

export enum Status {
  PENDING,
  ACCEPTED,
  DENIED,
}

export interface Reservation {
  clientName: string;
  clientEmail: string;
  clientDescription: string;
  venue: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: Status;
}

const reservationSchema = new Schema<Reservation>({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientDescription: { type: String, required: true },
  venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator(this: Reservation, value: Date) {
        return this.startTime < value;
      },
      message: "endTime must be after startTime",
    },
  },
  status: {
    type: Number,
    enum: Status,
    default: Status.PENDING,
    required: true,
  },
});

const ReservationModel =
  (models.Reservation as Model<Reservation>) ||
  model<Reservation>("Reservation", reservationSchema);

export default ReservationModel;
