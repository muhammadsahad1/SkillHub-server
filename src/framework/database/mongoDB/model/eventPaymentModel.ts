import mongoose, { Schema, Document } from "mongoose";
import { IEventPayment } from "../../../../commonEntities/entities/eventPayment";

const EventPaymentSchema = new mongoose.Schema<IEventPayment>({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentId: { type: String, required: true, unique: true },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "usd",
  },
  status: {
    type: String,
    required: true,
    enum: ["succeeded", "pending", "failed", "canceled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const EventPaymentModel = mongoose.model<IEventPayment>(
  "EventPayment",
  EventPaymentSchema
);
