import mongoose, { Document } from "mongoose";

export interface IVerificationRequest extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  profession: string;
  company?: string;
  website?: string;
  linkedin?: string;
  proofLink: string;
  experienceYears: number;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: Date;
}

export interface VerifyRequest {
  fullName: string;
  profession: string;
  company?: string;
  website?: string;
  linkedin?: string;
  proofLink: string;
}