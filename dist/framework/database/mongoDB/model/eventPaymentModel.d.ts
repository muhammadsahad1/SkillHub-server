import mongoose from "mongoose";
import { IEventPayment } from "../../../../commonEntities/entities/eventPayment";
export declare const EventPaymentModel: mongoose.Model<IEventPayment, {}, {}, {}, mongoose.Document<unknown, {}, IEventPayment> & IEventPayment & {
    _id: mongoose.Types.ObjectId;
}, any>;
