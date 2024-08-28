import mongoose from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  speaker: string;
  category: string;
  bannerName?: string;
  registrationLink: string;
  accessLink: string;
  isPublic: boolean;
  attendees: mongoose.Types.ObjectId[];
  eventStatus: string;
  approvalStatus: string;
  createdBy: mongoose.Types.ObjectId;
  bannerImageUrl : string;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// create event props
export interface ICreateEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  registrationLink: string;
  accessLink: string;
  price : string,
  currency : string,
  category: string;
}
