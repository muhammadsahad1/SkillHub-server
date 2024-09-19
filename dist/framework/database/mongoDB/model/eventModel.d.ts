import mongoose from "mongoose";
import { IEvent } from "../../../../commonEntities/entities/event";
declare const EventModel: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent> & IEvent & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default EventModel;
