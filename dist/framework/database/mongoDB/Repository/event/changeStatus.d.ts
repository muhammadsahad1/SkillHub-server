import EventModel from "../../model/eventModel";
export declare const changeStatus: (eventId: string, status: string, eventModel: typeof EventModel) => Promise<{
    success: boolean;
}>;
