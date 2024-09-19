import { ICreateEvent, IEvent } from "../../commonEntities/entities/event";
import { IEventRegister } from "../../commonEntities/entities/eventRegister";
import { IS3Operations } from "../../framework/service/s3Bucket";
import { Next } from "../../framework/types/serverPackageType";
import { IEventRepository } from "../../usecases/interface/repositoryInterface/eventRepository";
import { IEventUseCase } from "../interface/usecase/eventUseCase";
import { IStripeService } from "../../framework/service/stripService";
export declare class EventUseCase implements IEventUseCase {
    private eventRepository;
    private s3Operations;
    private stripService;
    constructor(eventRepository: IEventRepository, s3Operations: IS3Operations, stripService: IStripeService);
    createEvent(userId: string, data: ICreateEvent, bannerFile: Express.Multer.File | undefined, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getEvents(pageNumber: number, next: Next): Promise<IEvent[] | void>;
    eventDetails(eventId: string, next: Next): Promise<IEvent | void | null>;
    eventRegister(eventRegisterData: IEventRegister, next: Next): Promise<{
        success: boolean;
        message: string;
        joinToken?: string;
        paymentUrl?: string;
    } | void>;
    getEvent(eventId: string, next: Next): Promise<IEvent | void>;
    makePayment(eventPrice: string, eventId: string, userId: string, next: Next): Promise<string | void>;
    changeStatus(eventId: string, status: string, next: Next): Promise<{
        success: boolean;
    } | void>;
}
