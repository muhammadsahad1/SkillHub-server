import mongoose from "mongoose";
import { Iotp } from "../../../../commonEntities/entities/otp";
declare const otpModel: mongoose.Model<Iotp, {}, {}, {}, mongoose.Document<unknown, {}, Iotp> & Iotp & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<Iotp, mongoose.Model<Iotp, any, any, any, mongoose.Document<unknown, any, Iotp> & Iotp & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Iotp, mongoose.Document<unknown, {}, mongoose.FlatRecord<Iotp>> & mongoose.FlatRecord<Iotp> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default otpModel;
