import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { IStripeService } from "../../../framework/service/stripService";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const eventRegister: (stripService: IStripeService, eventRegisterData: IEventRegister, eventRepository: IEventRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
    joinToken?: string;
    paymentUrl?: string;
} | void>;
