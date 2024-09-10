// ================================= Admin injections ================================= \\
import { AdminController } from "../../../commonEntities/controllers/adminController";
import { AdminUseCase } from "../../../usecases/usecases/adminUseCase";
import { AdminRepository } from "../../database/mongoDB/Repository/adminRepository";
import { VerificationRequestModal } from "../../database/mongoDB/model/VerificationRequest";

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
import { NotificationRepository } from "../../database/mongoDB/Repository/notificationRepository";
import { NotificationModel } from "../../database/mongoDB/model/notification";
import { NotificationUseCase } from "../../../usecases/usecases/notificationUseCase";
import { NotificationController } from "../../../commonEntities/controllers/notificationController";

import { initializeSocket } from "../../service/socketIO";
import http from 'http'
import { EventRepository } from "../../database/mongoDB/Repository/eventRepository";
import EventModel from "../../database/mongoDB/model/eventModel";
import { EventUseCase } from "../../../usecases/usecases/eventUseCase";
import { EventController } from "../../../commonEntities/controllers/eventController";
import { EventPaymentModel } from "../../database/mongoDB/model/eventPaymentModel";
import { StripeService } from "../../service/stripService";
import Stripe from "stripe";
import { GroupRepository } from "../../database/mongoDB/Repository/groupRepository";
import { GroupModel } from "../../database/mongoDB/model/groupModel";
import { GroupUseCase } from "../../../usecases/usecases/groupUseCase";
import { GroupController } from "../../../commonEntities/controllers/groupController";
import GroupMessageModel from "../../database/mongoDB/model/groupMessageModel";
import ReportModel from "../../database/mongoDB/model/reportRequest";
const server = http.createServer()
// SOCKET intilaize
const io = initializeSocket(server)


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

const STRIP_SECRET_KEY = process.env.STRIP_SECRET_KEY

const stripeService = new StripeService(STRIP_SECRET_KEY)

const elasticSearchService = { indexUser, searchUsers };

// NOTIFICATION INECTIONS
const notificationRepository = new NotificationRepository(NotificationModel);
const notificationUseCase = new NotificationUseCase(notificationRepository,io);
const notificationController = new NotificationController(notificationUseCase);

// USER REPO FOR INTRACTE WITH DB
const userRepository = new UserRepository(userModel,PostModel,VerificationRequestModal,ReportModel);
const userUseCase = new UserUseCase(
  userRepository,
  jwt,
  otpRepository,
  hashPassword,
  otpGenerate,
  sendEmail,
  s3Operations,
  elasticSearchService,
  io,
  notificationRepository,
  
);
const userController = new UserController(userUseCase);

// Admin injection
const adminRepository = new AdminRepository(userModel,VerificationRequestModal,EventModel,ReportModel,PostModel,NotificationModel,GroupModel);
const adminUseCase = new AdminUseCase(
  adminRepository,
  jwt,
  hashPassword,
  sendEmail,
  s3Operations,
  io,
);
const adminController = new AdminController(adminUseCase);

// MESSAGE INJECTIONS
const messageRepository = new MessageRepository(
  ConversationModel,
  MessageModel,
  userModel
);
const messageUseCase = new MessageUseCase(messageRepository,s3Operations);
const messageController = new MessageController(messageUseCase);

// EVENT INJECTIONs
const eventRepository = new EventRepository(EventModel,EventPaymentModel,userModel)
const eventUseCase = new EventUseCase(eventRepository,s3Operations,stripeService)
const eventController = new EventController(eventUseCase)

const groupRepository = new GroupRepository(GroupModel,s3Operations,userModel,GroupMessageModel)
const groupUseCase = new GroupUseCase(groupRepository)
const groupController = new GroupController(groupUseCase)

export {
  adminController,
  userController,
  messageController,
  notificationController,
  eventController,
  groupController
};
