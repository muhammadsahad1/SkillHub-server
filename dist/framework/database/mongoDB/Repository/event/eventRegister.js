"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRegister = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//generate the token
const generateJoinToken = (length = 20) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
const eventRegister = (eventRegisterData, eventModel, eventPaymentModel, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId, name, email, phone, paymentId } = eventRegisterData;
        const eventID = new mongoose_1.default.Types.ObjectId(eventId);
        const event = yield eventModel.findById(eventID);
        if (!event) {
            return {
                success: false,
                message: "Event not found",
            };
        }
        const isAttendee = event.attendees.some((attend) => (attend === null || attend === void 0 ? void 0 : attend.userId.toString()) === userId);
        if (isAttendee) {
            return {
                success: false,
                message: "User already registered",
            };
        }
        if (event.price > 0) {
            if (!paymentId) {
                return {
                    success: false,
                    message: "Payment is required for this event",
                };
            }
            const payment = yield eventPaymentModel.create({
                eventId: event._id,
                userId,
                paymentId,
                amount: event.price,
                currency: "usd",
                status: "succeeded",
            });
            const result = yield payment.save();
            // getting the token
            const joinToken = generateJoinToken();
            //  updating the attendes payment event usr
            yield eventModel.findByIdAndUpdate(eventID, {
                $push: {
                    attendees: {
                        userId,
                        paymentStatus: "Completed",
                        stripePaymentId: paymentId,
                        joinToken,
                    },
                },
            });
            return {
                success: true,
                message: "regiseterd successful",
            };
        }
        else {
            const joinToken = generateJoinToken();
            // updating the attendes free event user
            const regiEvnt = yield eventModel.findByIdAndUpdate(eventID, {
                $push: {
                    attendees: {
                        userId,
                        paymentStatus: "Not Required",
                        joinToken,
                    },
                },
            });
            console.log("registerEVnt ===>", regiEvnt);
            return {
                success: true,
                message: "Registration successful",
                joinToken,
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "An error occurred during registration",
        };
    }
});
exports.eventRegister = eventRegister;
