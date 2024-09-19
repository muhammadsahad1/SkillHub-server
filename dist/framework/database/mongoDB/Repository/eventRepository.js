import { changeStatus, createOrUpdateEvent, eventDetails, eventRegister, getEvent, getEvents, } from "./event/index.js";
export class EventRepository {
    eventModel;
    eventPaymentModel;
    userModels;
    constructor(eventModel, eventPaymentModel, userModels) {
        this.eventModel = eventModel;
        this.eventPaymentModel = eventPaymentModel;
        this.userModels = userModels;
    }
    async createEvent(userId, data, bannerFile, s3) {
        return await createOrUpdateEvent(userId, data, bannerFile, s3, this.eventModel);
    }
    async getEvents(pageNumber, s3) {
        return await getEvents(pageNumber, this.eventModel, s3);
    }
    async eventDetails(eventId, s3Operations) {
        return await eventDetails(eventId, this.eventModel, s3Operations);
    }
    async eventRegister(stripService, eventRegisterData) {
        return await eventRegister(eventRegisterData, this.eventModel, this.eventPaymentModel, this.userModels);
    }
    async getEvent(eventId) {
        return await getEvent(eventId, this.eventModel);
    }
    async changeStatus(eventId, status) {
        return await changeStatus(eventId, status, this.eventModel);
    }
}
