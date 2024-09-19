import { changeStatus, createEvent, eventDetails, eventRegister, getEvent, getEvents, makePayment, } from "../usecases/event/index.js";
export class EventUseCase {
    eventRepository;
    s3Operations;
    stripService;
    constructor(eventRepository, s3Operations, stripService) {
        this.eventRepository = eventRepository;
        this.s3Operations = s3Operations;
        this.stripService = stripService;
    }
    async createEvent(userId, data, bannerFile, next) {
        return await createEvent(userId, data, bannerFile, this.eventRepository, this.s3Operations, next);
    }
    async getEvents(pageNumber, next) {
        return await getEvents(pageNumber, next, this.eventRepository, this.s3Operations);
    }
    async eventDetails(eventId, next) {
        return await eventDetails(eventId, this.s3Operations, this.eventRepository, next);
    }
    async eventRegister(eventRegisterData, next) {
        return await eventRegister(this.stripService, eventRegisterData, this.eventRepository, next);
    }
    async getEvent(eventId, next) {
        return await getEvent(eventId, this.eventRepository, next);
    }
    async makePayment(eventPrice, eventId, userId, next) {
        return await makePayment(this.stripService, eventPrice, eventId, userId, next);
    }
    async changeStatus(eventId, status, next) {
        return await changeStatus(eventId, status, this.eventRepository, next);
    }
}
