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

  async sentResetLinkVerification (name : string,email : string,resetToken : string) :Promise<any> {
    console.log("resetLink sending process")
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
      },
    }); 
    
    const sentResetLinkEmail = async ( name : string,email : string, resetToken : string) => {
      try {
      const mailOptions = {
        from : process.env.MAILER_EMAIL,
        to : email,
        subject : "Reseting password",
        text: `Hello ${name},

        We received a request to reset your password. You can reset your password by clicking the link below:
        
        http://localhost:5173/auth/resetpassword?resetToken=${encodeURIComponent(resetToken)}
        
        If you did not request this change, you can safely ignore this email. The link will expire in 24 hours for security reasons.
        
        Thank you,
        The SkillHub Team`
      }

        await transpoter.sendMail(mailOptions)
        
      } catch (error) {
        console.log("ERROR in sending mail", error);
        return error;
      }
    }

   await sentResetLinkEmail(name , email , resetToken)
  }
}
