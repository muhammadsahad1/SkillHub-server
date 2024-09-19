import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const changeStatus: (eventId: string, status: string, eventRepository: IEventRepository, next: Next) => Promise<void | {
    success: boolean;
}>;
