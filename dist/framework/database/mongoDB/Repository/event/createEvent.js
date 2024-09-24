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
exports.createOrUpdateEvent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
const createOrUpdateEvent = (userId, data, bannerFile, s3, eventModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data ==>", data);
        const { eventId, title, description, date, duration, speaker, time, category, price, currency, } = data;
        // Find existing event if eventId is provided
        let existingEvent = null;
        if (eventId) {
            existingEvent = yield eventModel.findById(eventId);
            if (!existingEvent) {
                return {
                    success: false,
                    message: "Event not found",
                };
            }
        }
        // Store the image in the S3 bucket and retrieve the banner name
        let bannerName = (existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.bannerName) || ""; // Use existing banner name if no new file
        if (bannerFile) {
            const { originalname, buffer, mimetype } = bannerFile;
            const PutObjectParams = { originalname, buffer, mimetype };
            bannerName = yield s3.putObjectUrl(PutObjectParams);
        }
        const eventDate = date ? new Date(date) : existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.date;
        const eventDuration = duration !== undefined ? Number(duration) : existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.duration;
        const priceValue = price !== undefined ? Number(price) : existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.price;
        if (existingEvent) {
            // Update existing event
            yield eventModel.findByIdAndUpdate(eventId, {
                title: title || existingEvent.title,
                description: description || existingEvent.description,
                date: eventDate,
                time: time || existingEvent.time,
                duration: eventDuration,
                speaker: speaker || existingEvent.speaker,
                category: category || existingEvent.category,
                price: priceValue,
                currency: currency || existingEvent.currency,
                bannerName, // Updated or existing banner name
            });
            return {
                success: true,
                message: "Event updated successfully",
            };
        }
        else {
            // Create new event
            const newEvent = {
                title,
                description,
                date: eventDate,
                time,
                duration: eventDuration,
                speaker,
                bannerName,
                category,
                price: priceValue,
                currency,
                createdBy: new mongoose_1.default.Types.ObjectId(userId),
            };
            // Save the event to the database
            const result = yield eventModel.create(newEvent);
            console.log("new Event ==>", result);
            return {
                success: true,
                message: "Create Event request is successful",
            };
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to create or update the event",
        };
    }
});
exports.createOrUpdateEvent = createOrUpdateEvent;
