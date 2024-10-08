import { Iuser } from "../../../../commonEntities/entities/user";

import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<Iuser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  blocked: { type: Boolean, default: false },
  phoneNumber: { type: String },
  profileImage: { type: String },
  imageKey: { type: String },
  bio: { type: String },
  created_at: { type: Date, default: Date.now },
  city: { type: String },
  country: { type: String },
  states: { type: String },
  skill: { type: String },
  profile: { type: Boolean, default: false },
  status: { type: Boolean },
  coverImageKey: { type: String },
  coverImage: { type: String },
  picture: { type: String },
  googleId: { type: String },
  googleAvatar: { type: String },
  resetPasswordToken: { type: String },
  showNotification: { type: Boolean },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  accountPrivacy: { type: Boolean, default: false },

  // New fields for professional account
  isProfessional: { type: Boolean, default: false },
  professionalBadge: { type: Boolean, default: false },
  website: { type: String, default: "" },
  isRequested: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  proofLink: { type: String },

  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
});

const userModel: Model<Iuser> = mongoose.model("User", userSchema);
export default userModel;
