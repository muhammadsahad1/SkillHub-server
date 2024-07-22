import { Iuser } from "../../../../entities/user";

import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<Iuser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default : 'user'},
  blocked: { type: Boolean, default :false },
  phoneNumber : { type : String },
  profileImage : { type : String},
  imageKey : { type : String},
  bio : { type : String},
  created_at : { type : Date },
  city : { type :String},
  country : { type : String },
  skill : { type : String },
  profile: { type : Boolean, default : false},
  picture : { type : String},
  googleId: { type: String }, 
  googleAvatar :{ type : String },
  resetPasswordToken : { type :String},
  email_notification : { type : Boolean , default : false},
  sms_notification : { type : Boolean , default : false} ,
});

const userModel: Model<Iuser> = mongoose.model('User',userSchema)
export default userModel

