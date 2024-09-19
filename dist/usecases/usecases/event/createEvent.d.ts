import { ICreateEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const createEvent: (userId: string, data: ICreateEvent, bannerFile: Express.Multer.File | undefined, eventRepository: IEventRepository, s3Operations: IS3Operations, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
