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
      isPublic: { type: Boolean, default: true },
      category: { type: String, default: "" },
      attendees: [
        {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Not Required"],
            default: "Not Required",
          },
          stripePaymentId: {
            type: String,
            required: function () {
              return this.paymentStatus === "Completed";
            },
          },
          joinToken: { type: String },
        },
      ],
      price: {
        type: Number,
        default: 0,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
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
