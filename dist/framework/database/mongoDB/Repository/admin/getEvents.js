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
const getEvents = (eventModel, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield eventModel.find({}).sort({ createdAt: -1 });
        if (!result) {
            return [];
        }
        // retriving the userName with events
        const userNameWithEvent = yield Promise.all(result.map((event) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userModels.findById(event.createdBy).select("name");
            return Object.assign(Object.assign({}, event.toObject()), { userName: user === null || user === void 0 ? void 0 : user.name });
        })));
        console.log("result ===>", userNameWithEvent);
        return userNameWithEvent;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.getEvents = getEvents;
