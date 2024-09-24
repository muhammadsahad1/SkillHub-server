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
exports.getEvents = void 0;
const EVENT_PER_PAGE = 3;
const getEvents = (pageNumber, eventModel, s3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventModel
            .find({ approvalStatus: "Approved" })
            .skip((pageNumber - 1) * EVENT_PER_PAGE)
            .limit(EVENT_PER_PAGE)
            .sort({ date: 1, createdAt: -1 })
            .exec();
        const eventsWithBannerImage = yield Promise.all(events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
            const bannerImageUrl = yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: (event === null || event === void 0 ? void 0 : event.bannerName) ? event === null || event === void 0 ? void 0 : event.bannerName : "",
            });
            return Object.assign(Object.assign({}, event.toObject()), { bannerImageUrl: bannerImageUrl });
        })));
        return eventsWithBannerImage;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
exports.getEvents = getEvents;
