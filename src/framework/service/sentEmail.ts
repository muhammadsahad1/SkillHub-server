import { IsendEmail } from "../../usecases/interface/service/sendEmail";
import nodemailer from "nodemailer";

export class SendEmail implements IsendEmail {
  constructor() {}

  async sentEmailVerification(name: string,email: string,verificationCode: string): Promise<any> {
    console.log("sending process");
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
      },
    });

    const sentVerificationEmail = async (
      name: string,
      toEmail: string,
      verificationCode: string
    ) => {
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
        await transpoter.sendMail(mailOptions);
      } catch (error) {
        console.log("ERROR in sending mail", error);
        return error;
      }
    };

    await sentVerificationEmail(name, email, verificationCode);
  }
}
