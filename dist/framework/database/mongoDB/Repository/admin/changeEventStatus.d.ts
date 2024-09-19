import EventModel from "../../model/eventModel";
export declare const changeEventStatus: (requestId: string, status: "Pending" | "Approved" | "Rejected", eventModel: typeof EventModel) => Promise<{
    success: boolean;
} | undefined>;
