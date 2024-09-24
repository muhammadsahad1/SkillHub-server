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
exports.OtpGenerate = void 0;
class OtpGenerate {
    createOtp() {
        return __awaiter(this, void 0, void 0, function* () {
            let numericChar = '0123456789';
            let otp = '';
            for (let i = 0; i < 4; i++) {
                let randomIndx = Math.floor(Math.random() * numericChar.length);
                otp += numericChar[randomIndx];
            }
            return otp;
        });
    }
}
exports.OtpGenerate = OtpGenerate;
