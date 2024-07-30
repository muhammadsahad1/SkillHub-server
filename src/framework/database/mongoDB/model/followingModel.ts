import mongoose, { Model, Schema } from "mongoose";
import { Following } from "../../../../commonEntities/entities/user";

const followingSchema : Schema<Following> = new mongoose.Schema({
  userId: { type: String, required: true },
  followingId: { type: String, required: true },
  followedAt: { type: Date, default: Date.now },
})

const FollowingModel : Model<Following> = mongoose.model('followerSchema',followingSchema)
export default FollowingModel