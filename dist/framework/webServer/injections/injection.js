// ================================= Admin injections ================================= \\
import { AdminController } from "../../../commonEntities/controllers/adminController.js";
import { AdminUseCase } from "../../../usecases/usecases/adminUseCase.js";
import { AdminRepository } from "../../database/mongoDB/Repository/adminRepository.js";
import { VerificationRequestModal } from "../../database/mongoDB/model/VerificationRequest.js";
// ================================= User injections ================================= \\
import { UserController } from "../../../commonEntities/controllers/userController.js";
import { UserUseCase } from "../../../usecases/usecases/userUseCase.js";
import userModel from "../../database/mongoDB/model/userModel.js";
import { UserRepository } from "../../database/mongoDB/Repository/userRepository.js";
import { OtpRepository } from "../../database/mongoDB/Repository/otpRepository.js";
import { JWTtoken } from "../../service/jwt.js";
import { Encrypt } from "../../service/hashPassword.js";
import { OtpGenerate } from "../../service/otpGenerate.js";
import { SendEmail } from "../../service/sentEmail.js";
import { S3Operations } from "../../service/s3Bucket.js";
import { indexUser, searchUsers } from "../../service/elasticsearchService.js";
import PostModel from "../../database/mongoDB/model/postModel.js";
// ================================= Message injections ================================= \\
import { MessageController } from "../../../commonEntities/controllers/messageController.js";
import MessageModel from "../../database/mongoDB/model/message.js";
import ConversationModel from "../../database/mongoDB/model/conversation.js";
import { MessageUseCase } from "../../../usecases/usecases/messageUseCase.js";
import { MessageRepository } from "../../database/mongoDB/Repository/messageRepository.js";
import { NotificationRepository } from "../../database/mongoDB/Repository/notificationRepository.js";
import { NotificationModel } from "../../database/mongoDB/model/notification.js";
import { NotificationUseCase } from "../../../usecases/usecases/notificationUseCase.js";
import { NotificationController } from "../../../commonEntities/controllers/notificationController.js";
import initializeSocket from "../../service/socketIO.js";
import http from 'http';
import { EventRepository } from "../../database/mongoDB/Repository/eventRepository.js";
import EventModel from "../../database/mongoDB/model/eventModel.js";
import { EventUseCase } from "../../../usecases/usecases/eventUseCase.js";
import { EventController } from "../../../commonEntities/controllers/eventController.js";
import { EventPaymentModel } from "../../database/mongoDB/model/eventPaymentModel.js";
import { StripeService } from "../../service/stripService.js";
import { GroupRepository } from "../../database/mongoDB/Repository/groupRepository.js";
import { GroupModel } from "../../database/mongoDB/model/groupModel.js";
import { GroupUseCase } from "../../../usecases/usecases/groupUseCase.js";
import { GroupController } from "../../../commonEntities/controllers/groupController.js";
import GroupMessageModel from "../../database/mongoDB/model/groupMessageModel.js";
import ReportModel from "../../database/mongoDB/model/reportRequest.js";
const server = http.createServer();
// SOCKET intilaize
const io = initializeSocket(server);
// Retrieve environment variables
const region = process.env.C3_BUCKET_REGION || "";
const accessKeyId = process.env.C3_ACCESS_KEY || "";
const secretAccessKey = process.env.C3_SCERET_KEY || "";
const bucketName = process.env.C3_BUCKET_NAME || "";
// ====================== Instantiate / providing ( Dpendencies Injections )  ====================== \\
// FOR UPLOADING IMAGE TO S3 BUCKET
const s3Operations = new S3Operations(region, accessKeyId, secretAccessKey, bucketName);
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
const STRIP_SECRET_KEY = process.env.STRIP_SECRET_KEY;
const stripeService = new StripeService(STRIP_SECRET_KEY);
const elasticSearchService = { indexUser, searchUsers };
// NOTIFICATION INECTIONS
const notificationRepository = new NotificationRepository(NotificationModel);
const notificationUseCase = new NotificationUseCase(notificationRepository, io);
const notificationController = new NotificationController(notificationUseCase);
// USER REPO FOR INTRACTE WITH DB
const userRepository = new UserRepository(userModel, PostModel, VerificationRequestModal, ReportModel);
const userUseCase = new UserUseCase(userRepository, jwt, otpRepository, hashPassword, otpGenerate, sendEmail, s3Operations, elasticSearchService, io, notificationRepository);
const userController = new UserController(userUseCase);
// Admin injection
const adminRepository = new AdminRepository(userModel, VerificationRequestModal, EventModel, ReportModel, PostModel, NotificationModel, GroupModel);
const adminUseCase = new AdminUseCase(adminRepository, jwt, hashPassword, sendEmail, s3Operations, io);
const adminController = new AdminController(adminUseCase);
// MESSAGE INJECTIONS
const messageRepository = new MessageRepository(ConversationModel, MessageModel, userModel);
const messageUseCase = new MessageUseCase(messageRepository, s3Operations);
const messageController = new MessageController(messageUseCase);
// EVENT INJECTIONs
const eventRepository = new EventRepository(EventModel, EventPaymentModel, userModel);
const eventUseCase = new EventUseCase(eventRepository, s3Operations, stripeService);
const eventController = new EventController(eventUseCase);
const groupRepository = new GroupRepository(GroupModel, s3Operations, userModel, GroupMessageModel);
const groupUseCase = new GroupUseCase(groupRepository);
const groupController = new GroupController(groupUseCase);
export { adminController, userController, messageController, notificationController, eventController, groupController };
