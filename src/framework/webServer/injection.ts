import { UserController } from "../../controllers/userController";
import { UserUseCase } from "../../usecases/usecases/userUseCase";
import userModel from "../database/mongoDB/model/userModel";
import { UserRepository } from "../database/mongoDB/Repository/userRepository";
import { OtpRepository } from "../database/mongoDB/Repository/otpRepository";
import { JWTtoken } from "../service/jwt";
import { Encrypt } from "../service/hashPassword";
import { OtpGenerate } from "../service/otpGenerate";
import { SendEmail } from "../service/sentEmail";
import { S3Operations } from "../service/s3Bucket";

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
// HERE USER'S USERUSECASE ( HERE THE ALL THE USERS USE CASES )
const userUseCase = new UserUseCase(userRepository,jwt,otpRepository,hashPassword,otpGenerate,sendEmail,uploadImage)
// INSTANTIATE TO USER CONTROLLER ( AFTER ROUTE ACCESSING )
const userController = new UserController(userUseCase)


export {
  userController 
}

