import mongoose, { Schema, Model, Document } from "mongoose";
import { Ipost } from "../../../../commonEntities/entities/post";

const PostSchema: Schema<Ipost> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    imageName: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const PostModel: Model<Ipost> = mongoose.model<Ipost>("Post", PostSchema);

export default PostModel;
