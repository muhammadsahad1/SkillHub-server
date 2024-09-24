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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoinLink = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
// Convert the date and time to ISO 8601 format
function convertToISO(date, time) {
    console.log("date ==>", date, "time ===>", time);
    const dateTime = `${date.split('T')[0]}T${time}:00Z`;
    console.log("date Time ==>", dateTime);
    return new Date(dateTime).toISOString();
}
const getJoinLink = (date, time, duration, next, zoomService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Zoom access token
        const accessToken = yield zoomService.getZoomAccessToken();
        if (!accessToken) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "AccessToken failed to generate"));
        }
        // Convert date and time to ISO 8601 format
        const isoStartTime = convertToISO(date, time);
        const Duration = Number(duration);
        // Create a Zoom meeting
        const meeting = yield zoomService.createMeeting(accessToken, {
            topic: "Event Meeting",
            type: 2,
            start_time: isoStartTime,
            duration: Duration,
            timezone: "UTC"
        });
        console.log("meeting data ==>", meeting);
        // Return the join URL from the Zoom meeting response
        return meeting === null || meeting === void 0 ? void 0 : meeting.join_url;
    }
    catch (error) {
        console.error("Error in getJoinLink:", error);
        return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal server error"));
    }
});
exports.getJoinLink = getJoinLink;
