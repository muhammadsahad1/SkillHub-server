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
exports.resetPasswordVerify = void 0;
const resetPasswordVerify = (userModels, password, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUser = yield userModels.findOne({ resetPasswordToken: token });
        if (!fetchedUser) {
            return;
        }
        const updatedUser = yield userModels.findByIdAndUpdate({ _id: fetchedUser._id }, {
            $set: {
                password: password,
                resetPasswordToken: "",
            },
        }, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.error("Error finding user by email:", error);
    }
});
exports.resetPasswordVerify = resetPasswordVerify;
