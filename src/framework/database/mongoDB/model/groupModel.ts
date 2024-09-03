import mongoose, { Schema } from "mongoose";
import { IGroup } from "../../../../commonEntities/entities/group";

const groupSchema: Schema<IGroup> = new mongoose.Schema({
  groupName: { type: String, required: true, },
  description: { type: String, required: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  skills: [{ type: Array, required: true }],
  groupImage: { type: String },
},
{
timestamps : true
});

export const GroupModel = mongoose.model<IGroup>("Group", groupSchema);
