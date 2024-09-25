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
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendEmail {
    constructor() { }
    sentEmailVerification(name, email, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("sending process");
            const transpoter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASS,
                },
            });
            const sentVerificationEmail = (name, toEmail, verificationCode) => __awaiter(this, void 0, void 0, function* () {
                const mailOptions = {
                    from: process.env.MAILER_EMAIL,
                    to: toEmail,
                    subject: "Email verification",
                    text: `Hi ${name},
Welcome to SkillHub! Please verify your email using the code below:

verification Code : ${verificationCode} 

If you did not sign up for SkillHub, please ignore this email.

Thanks,
The SkillHub Team`,
                    html: `<p>Hi ${name},</p>
<p>Welcome to <strong>SkillHub</strong>! Please verify your email using the code below:</p>
<p><strong>Verification Code: ${verificationCode}</strong></p>
<p>If you did not sign up for SkillHub, please ignore this email.</p>
<p>Thanks,<br>The SkillHub Team</p>`,
                };
                try {
                    yield transpoter.sendMail(mailOptions);
                }
                catch (error) {
                    console.log("ERROR in sending mail", error);
                    return error;
                }
            });
            yield sentVerificationEmail(name, email, verificationCode);
        });
    }
    sentResetLinkVerification(name, email, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("resetLink sending process");
            const transpoter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASS,
                },
            });
            const sentResetLinkEmail = (name, email, resetToken) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const mailOptions = {
                        from: process.env.MAILER_EMAIL,
                        to: email,
                        subject: "Reseting password",
                        text: `Hello ${name},

        We received a request to reset your password. You can reset your password by clicking the link below:
        
        https://localhost:5173  /auth/resetpassword?resetToken=${encodeURIComponent(resetToken)}
        
        If you did not request this change, you can safely ignore this email. The link will expire in 24 hours for security reasons.
        
        Thank you,
        The SkillHub Team`
                    };
                    yield transpoter.sendMail(mailOptions);
                    console.log(`url =>",http://localhost:5173/auth/resetpassword?resetToken=${encodeURIComponent(resetToken)}`);
                }
                catch (error) {
                    console.log("ERROR in sending mail", error);
                    return error;
                }
            });
            yield sentResetLinkEmail(name, email, resetToken);
        });
    }
}
exports.SendEmail = SendEmail;
