import mongoose from "mongoose";


export interface IAttendee {
  userId: mongoose.Types.ObjectId;
  paymentStatus: "Pending" | "Completed" | "Not Required";
  stripePaymentId?: string; 
  joinToken : string
}

export interface IEvent {
  paymentStatus: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  speaker: string;
  category: string;
  bannerName?: string;
  isPublic: boolean;
  attendees: IAttendee[];
  eventStatus: string;
  approvalStatus: string;
  createdBy: mongoose.Types.ObjectId;
  bannerImageUrl? : string;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// create event props
export interface ICreateEvent {
  eventId : string,
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  price : string,
  currency : string,
  category: string;
}
