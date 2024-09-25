import mongoose, { Schema, Model, Document } from "mongoose";
import { Ipost } from "../../../../commonEntities/entities/post";

const PostSchema: Schema<Ipost> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    imageName: {
      type: String,
      required: function () {
        {
          return this.type !== "thoughts";
        }
      },
    },
    caption: { type: String, default: "" },
    type: {
      type: String,
      enum: ["image", "video", "thoughts"],
      required: function () {
        return this.type !== "thoughts";
      },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        userName: { type: String },
        comment: { type: String },
        created_at: { type: Date, default: Date.now },
      },
    ],
    saves: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reports: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        reason: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel: Model<Ipost> = mongoose.model<Ipost>("Post", PostSchema);

export default PostModel;
