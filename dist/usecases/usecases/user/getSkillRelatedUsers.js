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
exports.getSkillRelatedUsers = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const getSkillRelatedUsers = (userId, skill, userRepository, s3, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("casil ketiiiiiiii");
    const result = yield userRepository.getSkillRelatedUsers(userId, skill, s3);
    console.log("result after repo ==>", result);
    if (!result) {
        return next(new errorMiddleware_js_1.ErrorHandler(401, "fetching skill related users failed"));
    }
    return {
        success: true,
        userDetails: result,
    };
});
exports.getSkillRelatedUsers = getSkillRelatedUsers;
