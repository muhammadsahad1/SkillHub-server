import mongoose from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  speaker: string;
  category: string;
  bannerName: string;
  registrationLink: string;
  accessLink: string;
  isPublic: boolean;
  attendees: string[];
  createdAt: Date;
  updatedAt: Date;
}
