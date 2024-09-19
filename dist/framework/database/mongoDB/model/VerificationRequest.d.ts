import mongoose, { Schema } from "mongoose";
import { IVerificationRequest } from "../../../../commonEntities/entities/verificationRequest";
export declare const VerificationRequestSchema: Schema<IVerificationRequest>;
export declare const VerificationRequestModal: mongoose.Model<IVerificationRequest, {}, {}, {}, mongoose.Document<unknown, {}, IVerificationRequest> & IVerificationRequest & Required<{
    _id: unknown;
}>, any>;
