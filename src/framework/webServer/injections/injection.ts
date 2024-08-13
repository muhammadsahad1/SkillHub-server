// ================================= Admin injections ================================= \\
import { AdminController } from "../../../commonEntities/controllers/adminController";
import { AdminUseCase } from "../../../usecases/usecases/adminUseCase";
import { AdminRepository } from "../../database/mongoDB/Repository/adminRepository";

// ================================= User injections ================================= \\
import { UserController } from "../../../commonEntities/controllers/userController";
import { UserUseCase } from "../../../usecases/usecases/userUseCase";
import userModel from "../../database/mongoDB/model/userModel";
import { UserRepository } from "../../database/mongoDB/Repository/userRepository";
import { OtpRepository } from "../../database/mongoDB/Repository/otpRepository";

import { JWTtoken } from "../../service/jwt";
import { Encrypt } from "../../service/hashPassword";
import { OtpGenerate } from "../../service/otpGenerate";
import { SendEmail } from "../../service/sentEmail";
import { S3Operations } from "../../service/s3Bucket";
import { indexUser, searchUsers } from "../../service/elasticsearchService";
import PostModel from "../../database/mongoDB/model/postModel";

// ================================= Message injections ================================= \\
import { MessageController } from "../../../commonEntities/controllers/messageController";
import MessageModel from "../../database/mongoDB/model/message";
import ConversationModel from "../../database/mongoDB/model/conversation";
import { MessageUseCase } from "../../../usecases/usecases/messageUseCase";
import { MessageRepository } from "../../database/mongoDB/Repository/messageRepository";

// Retrieve environment variables
const region = process.env.C3_BUCKET_REGION || "";
const accessKeyId = process.env.C3_ACCESS_KEY || "";
const secretAccessKey = process.env.C3_SCERET_KEY || "";
const bucketName = process.env.C3_BUCKET_NAME || "";

// ====================== Instantiate / providing ( Dpendencies Injections )  ====================== \\

// FOR UPLOADING IMAGE TO S3 BUCKET
const s3Operations = new S3Operations(
  region,
  accessKeyId,
  secretAccessKey,
  bucketName
);
// TOKEN
const jwt = new JWTtoken();
// OTP INTRACTE WITH DB
const otpRepository = new OtpRepository();
// HASHING PASSOWRD
const hashPassword = new Encrypt();
// GENERATE RANDOM OTP
const otpGenerate = new OtpGenerate();
// NODEMAIER SEND MAIL
const sendEmail = new SendEmail();

const elasticSearchService = { indexUser, searchUsers };

// USER REPO FOR INTRACTE WITH DB
const userRepository = new UserRepository(userModel, PostModel);
const userUseCase = new UserUseCase(
  userRepository,
  jwt,
  otpRepository,
  hashPassword,
  otpGenerate,
  sendEmail,
  s3Operations,
  elasticSearchService
);
const userController = new UserController(userUseCase);

const adminRepository = new AdminRepository(userModel);
const adminUseCase = new AdminUseCase(
  adminRepository,
  jwt,
  hashPassword,
  sendEmail,
  s3Operations
);
const adminController = new AdminController(adminUseCase);


const messageRepository = new MessageRepository(
  ConversationModel,
  MessageModel,
  userModel
);
const messageUseCase = new MessageUseCase(messageRepository,s3Operations);
const messageController = new MessageController(messageUseCase);



export { adminController, userController, messageController };
