import { ICreateEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";
export declare const createOrUpdateEvent: (userId: string, data: ICreateEvent, bannerFile: Express.Multer.File | undefined, s3: IS3Operations, eventModel: typeof EventModel) => Promise<{
    success: boolean;
    message: string;
} | void>;
