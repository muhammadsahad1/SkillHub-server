// ================================= Admin injections ================================= \\
import { AdminController } from "../../../commonEntities/controllers/adminController";
import { AdminUseCase } from "../../../usecases/usecases/adminUseCase";
import { AdminRepository } from "../../database/mongoDB/Repository/adminRepository";




// ================================= User injections ================================= \\
import { UserController } from "../../../commonEntities/controllers/userController";
import { UserUseCase } from "../../../usecases/usecases/userUseCase";
import userModel from "../../database/mongoDB/model/userModel";
import PrivacyModal from "../../database/mongoDB/model/privacyModel";
import { UserRepository } from "../../database/mongoDB/Repository/userRepository";
import { OtpRepository } from "../../database/mongoDB/Repository/otpRepository";
import { IprivacyRepository } from "../../../usecases/interface/repositoryInterface/privacyRepository";

import { JWTtoken } from "../../service/jwt";
import { Encrypt } from "../../service/hashPassword";
import { OtpGenerate } from "../../service/otpGenerate";
import { SendEmail } from "../../service/sentEmail";
import { S3Operations } from "../../service/s3Bucket";
import { PrivacyRepository } from "../../database/mongoDB/Repository/privacyRepository";

// Retrieve environment variables 
const region = process.env.C3_BUCKET_REGION || "";
const accessKeyId = process.env.C3_ACCESS_KEY || "";
const secretAccessKey = process.env.C3_SCERET_KEY || "";
const bucketName = process.env.C3_BUCKET_NAME || "";

// ====================== Instantiate / providing ( Dpendencies Injections )  ====================== \\

// FOR UPLOADING IMAGE TO S3 BUCKET
const uploadImage = new S3Operations(region, accessKeyId, secretAccessKey, bucketName);
// USER REPO FOR INTRACTE WITH DB
const userRepository = new UserRepository(userModel)
const privacyRepository = new PrivacyRepository(PrivacyModal)
// TOKEN
const jwt = new JWTtoken()
// OTP INTRACTE WITH DB
const otpRepository = new OtpRepository()
// HASHING PASSOWRD 
const hashPassword = new Encrypt()
// GENERATE RANDOM OTP 
const otpGenerate = new OtpGenerate()
// NODEMAIER SEND MAIL
const sendEmail = new SendEmail()


const userUseCase = new UserUseCase(userRepository,privacyRepository,jwt,otpRepository,hashPassword,otpGenerate,sendEmail,uploadImage)
const userController = new UserController(userUseCase)


const adminRepository = new AdminRepository(userModel)
const adminUseCase = new AdminUseCase(adminRepository,jwt,hashPassword,sendEmail,uploadImage)
const adminController = new AdminController(adminUseCase)


export {
  adminController,
  userController 
}

