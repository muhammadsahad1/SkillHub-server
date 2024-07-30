import mongoose, { Model, Schema } from "mongoose";
import { Follower } from "../../../../commonEntities/entities/user";

const followerSchema : Schema<Follower> = new mongoose.Schema({
  userId: { type: String, required: true },
  followerId: { type: String, required: true },
  followedAt: { type: Date, default: Date.now },
})

const FollwerModel : Model<Follower> = mongoose.model('followerSchema',followerSchema)
export default FollwerModel