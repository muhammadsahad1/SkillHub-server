import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
// [=============================== Event Controller =============================]
export class EventController {
    eventUseCase;
    constructor(eventUseCase) {
        this.eventUseCase = eventUseCase;
    }
    // creating Event
    async createEvent(req, res, next) {
        try {
            const data = req.body;
            const userId = req.user?.id;
            const result = await this.eventUseCase?.createEvent(userId, data, req.file, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    // fetching the all events
    async getEvents(req, res, next) {
        try {
            console.log("req.q ==>", req.query);
            const pageNumber = parseInt(req.query.pageNumber, 10);
            const result = await this.eventUseCase.getEvents(pageNumber, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async eventDetails(req, res, next) {
        try {
            const eventId = req.query.eventId;
            const result = await this.eventUseCase.eventDetails(eventId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async eventRegister(req, res, next) {
        try {
            const { registerData } = req.body;
            const result = await this.eventUseCase.eventRegister(registerData, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async joinMeeting(req, res, next) {
        try {
            const { eventId } = req.query;
            const result = await this.eventUseCase.getEvent(eventId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async makePayment(req, res, next) {
        try {
            const { eventPrice, eventId, userId } = req.body;
            console.log("bodyy ==>", req.body);
            const result = await this.eventUseCase.makePayment(eventPrice, eventId, userId, next);
            console.log("resu ==>", result);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async changeStatus(req, res, next) {
        const { eventId, status } = req.body;
        const result = await this.eventUseCase.changeStatus(eventId, status, next);
        if (result) {
            res.status(200).json(status);
        }
    }
}
