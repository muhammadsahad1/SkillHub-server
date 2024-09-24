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
exports.OtpRepository = void 0;
const otpModel_js_1 = __importDefault(require("../model/otpModel.js"));
class OtpRepository {
    resendOtp(email, otp) {
        throw new Error("Method not implemented.");
    }
    // creating opt document for particular time (1m) 
    createOtp(username, email, userPassword, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultOtp = yield otpModel_js_1.default.create({ username, email, userPassword, otp });
                resultOtp.save();
                console.log("created OTP ==>", resultOtp);
                return resultOtp;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchOtp = yield otpModel_js_1.default.findOne({ email });
                console.log("fetchOtp ===>", fetchOtp);
                return fetchOtp;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.OtpRepository = OtpRepository;
