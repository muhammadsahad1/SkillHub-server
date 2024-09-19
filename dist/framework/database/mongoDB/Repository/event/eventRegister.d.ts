import { IEventRegister } from "../../../../../commonEntities/entities/eventRegister";
import EventModel from "../../model/eventModel";
import { EventPaymentModel } from "../../model/eventPaymentModel";
import userModel from "../../model/userModel";
export declare const eventRegister: (eventRegisterData: IEventRegister, eventModel: typeof EventModel, eventPaymentModel: typeof EventPaymentModel, userModels: typeof userModel) => Promise<{
    success: boolean;
    message: string;
    joinToken?: string;
    paymentUrl?: string;
}>;
