import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IStripeService } from "../../../framework/service/stripService";
export interface IEventRepository {
    createEvent(userId: string, data: ICreateEvent, bannerFile: Express.Multer.File | undefined, s3Operations: IS3Operations): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getEvents(pogeNumber: number, s3Operations: IS3Operations): Promise<IEvent[] | void>;
    eventDetails(eventId: string, s3Operations: IS3Operations): Promise<IEvent | void | null>;
    eventRegister(stripService: IStripeService, eventRegisterData: IEventRegister): Promise<{
        success: boolean;
        message: string;
        joinToken?: string;
        paymentUrl?: string;
    }>;
    getEvent(eventId: string): Promise<IEvent | null | void>;
    changeStatus(eventId: string, status: string): Promise<{
        success: boolean;
    } | void>;
}
