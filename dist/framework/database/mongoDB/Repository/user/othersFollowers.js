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
exports.getOthersFollowers = void 0;
// Define the function to fetch followers
const getOthersFollowers = (userId, userModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.findById(userId);
        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }
        const followers = user.followers;
        yield userModel.find();
        return followers;
    }
    catch (error) {
        console.error("Error fetching followers:", error);
        throw new Error("Unable to fetch followers");
    }
});
exports.getOthersFollowers = getOthersFollowers;
