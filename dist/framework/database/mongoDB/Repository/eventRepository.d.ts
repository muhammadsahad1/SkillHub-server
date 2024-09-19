import { ICreateEvent, IEvent } from "../../../../commonEntities/entities/event";
import { IEventRegister } from "../../../../commonEntities/entities/eventRegister";
import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import { IStripeService } from "../../../service/stripService";
import EventModel from "../model/eventModel";
import { EventPaymentModel } from "../model/eventPaymentModel";
import userModel from "../model/userModel";
export declare class EventRepository implements IEventRepository {
    private eventModel;
    private eventPaymentModel;
    private userModels;
    constructor(eventModel: typeof EventModel, eventPaymentModel: typeof EventPaymentModel, userModels: typeof userModel);
    createEvent(userId: string, data: ICreateEvent, bannerFile: Express.Multer.File | undefined, s3: IS3Operations): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getEvents(pageNumber: number, s3: IS3Operations): Promise<IEvent[] | void>;
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
