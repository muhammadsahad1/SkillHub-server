import mongoose, { Document, Schema } from "mongoose";
import { IEvent } from "../../../../commonEntities/entities/event";

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    speaker: { type: String, required: true },
    bannerName: { type: String },
    registrationLink: { type: String, required: true, unique: true },
    accessLink: { type: String, required: true, unique: true },
    isPublic: { type: Boolean, default: true },
    category: { type: String, default: "" },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    eventStatus: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model<IEvent>("Events", EventSchema);
export default EventModel;
