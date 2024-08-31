import mongoose from "mongoose";

export interface IEventPayment {
  eventId : mongoose.Types.ObjectId,
  userId : mongoose.Types.ObjectId,
  paymentId : string ,
  amount : number ,
  currency : string ,
  status : string,
  createdAt : Date
}

