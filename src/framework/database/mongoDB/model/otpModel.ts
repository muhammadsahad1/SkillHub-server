import mongoose, { Schema, Model } from "mongoose";
import { Iotp } from "../../../../commonEntities/entities/otp";

const otpSchema: Schema<Iotp> = new mongoose.Schema({
  username : {
    type : String,
    require : true
  },
  email: {
    type: String,
    required: true,
  },
  userPassword : {
    type : String,
    require : true
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: function() {
      return Date.now() + 60 * 1000;
    }
  },
});

// impliment ttl index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model("Otp", otpSchema);
export default otpModel;
