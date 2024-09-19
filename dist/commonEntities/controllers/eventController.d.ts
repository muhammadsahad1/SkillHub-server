import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { IEventUseCase } from "../../usecases/interface/usecase/eventUseCase";
export declare class EventController {
    private eventUseCase;
    constructor(eventUseCase: IEventUseCase);
    createEvent(req: CustomRequest, res: Res, next: Next): Promise<void>;
    getEvents(req: Req, res: Res, next: Next): Promise<void>;
    eventDetails(req: Req, res: Res, next: Next): Promise<void>;
    eventRegister(req: Req, res: Res, next: Next): Promise<void>;
    joinMeeting(req: Req, res: Res, next: Next): Promise<void>;
    makePayment(req: Req, res: Res, next: Next): Promise<void>;
    changeStatus(req: Req, res: Res, next: Next): Promise<void>;
}
