"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupController = exports.eventController = exports.notificationController = exports.messageController = exports.userController = exports.adminController = void 0;
// ================================= Admin injections ================================= \\
const adminController_1 = require("../../../commonEntities/controllers/adminController");
const adminUseCase_1 = require("../../../usecases/usecases/adminUseCase");
const adminRepository_1 = require("../../database/mongoDB/Repository/adminRepository");
const VerificationRequest_1 = require("../../database/mongoDB/model/VerificationRequest");
// ================================= User injections ================================= \\
const userController_1 = require("../../../commonEntities/controllers/userController");
const userUseCase_1 = require("../../../usecases/usecases/userUseCase");
const userModel_1 = __importDefault(require("../../database/mongoDB/model/userModel"));
const userRepository_1 = require("../../database/mongoDB/Repository/userRepository");
const otpRepository_1 = require("../../database/mongoDB/Repository/otpRepository");
const jwt_1 = require("../../service/jwt");
const hashPassword_1 = require("../../service/hashPassword");
const otpGenerate_1 = require("../../service/otpGenerate");
const sentEmail_1 = require("../../service/sentEmail");
const s3Bucket_1 = require("../../service/s3Bucket");
const elasticsearchService_1 = require("../../service/elasticsearchService");
const postModel_1 = __importDefault(require("../../database/mongoDB/model/postModel"));
// ================================= Message injections ================================= \\
const messageController_1 = require("../../../commonEntities/controllers/messageController");
const message_1 = __importDefault(require("../../database/mongoDB/model/message"));
const conversation_1 = __importDefault(require("../../database/mongoDB/model/conversation"));
const messageUseCase_1 = require("../../../usecases/usecases/messageUseCase");
const messageRepository_1 = require("../../database/mongoDB/Repository/messageRepository");
const notificationRepository_1 = require("../../database/mongoDB/Repository/notificationRepository");
const notification_1 = require("../../database/mongoDB/model/notification");
const notificationUseCase_1 = require("../../../usecases/usecases/notificationUseCase");
const notificationController_1 = require("../../../commonEntities/controllers/notificationController");
const socketIO_1 = __importDefault(require("../../service/socketIO"));
const http_1 = __importDefault(require("http"));
const eventRepository_1 = require("../../database/mongoDB/Repository/eventRepository");
const eventModel_1 = __importDefault(require("../../database/mongoDB/model/eventModel"));
const eventUseCase_1 = require("../../../usecases/usecases/eventUseCase");
const eventController_1 = require("../../../commonEntities/controllers/eventController");
const eventPaymentModel_1 = require("../../database/mongoDB/model/eventPaymentModel");
const stripService_1 = require("../../service/stripService");
const groupRepository_1 = require("../../database/mongoDB/Repository/groupRepository");
const groupModel_1 = require("../../database/mongoDB/model/groupModel");
const groupUseCase_1 = require("../../../usecases/usecases/groupUseCase");
const groupController_1 = require("../../../commonEntities/controllers/groupController");
const groupMessageModel_1 = __importDefault(require("../../database/mongoDB/model/groupMessageModel"));
const reportRequest_1 = __importDefault(require("../../database/mongoDB/model/reportRequest"));
const server = http_1.default.createServer();
// SOCKET intilaize
const io = (0, socketIO_1.default)(server);
// Retrieve environment variables
const region = process.env.C3_BUCKET_REGION || "";
const accessKeyId = process.env.C3_ACCESS_KEY || "";
const secretAccessKey = process.env.C3_SCERET_KEY || "";
const bucketName = process.env.C3_BUCKET_NAME || "";
// ====================== Instantiate / providing ( Dpendencies Injections )  ====================== \\
// FOR UPLOADING IMAGE TO S3 BUCKET
const s3Operations = new s3Bucket_1.S3Operations(region, accessKeyId, secretAccessKey, bucketName);
// TOKEN
const jwt = new jwt_1.JWTtoken();
// OTP INTRACTE WITH DB
const otpRepository = new otpRepository_1.OtpRepository();
// HASHING PASSOWRD
const hashPassword = new hashPassword_1.Encrypt();
// GENERATE RANDOM OTP
const otpGenerate = new otpGenerate_1.OtpGenerate();
// NODEMAIER SEND MAIL
const sendEmail = new sentEmail_1.SendEmail();
const STRIP_SECRET_KEY = process.env.STRIP_SECRET_KEY;
const stripeService = new stripService_1.StripeService(STRIP_SECRET_KEY);
const elasticSearchService = { indexUser: elasticsearchService_1.indexUser, searchUsers: elasticsearchService_1.searchUsers };
// NOTIFICATION INECTIONS
const notificationRepository = new notificationRepository_1.NotificationRepository(notification_1.NotificationModel);
const notificationUseCase = new notificationUseCase_1.NotificationUseCase(notificationRepository, io);
const notificationController = new notificationController_1.NotificationController(notificationUseCase);
exports.notificationController = notificationController;
// USER REPO FOR INTRACTE WITH DB
const userRepository = new userRepository_1.UserRepository(userModel_1.default, postModel_1.default, VerificationRequest_1.VerificationRequestModal, reportRequest_1.default);
const userUseCase = new userUseCase_1.UserUseCase(userRepository, jwt, otpRepository, hashPassword, otpGenerate, sendEmail, s3Operations, elasticSearchService, io, notificationRepository);
const userController = new userController_1.UserController(userUseCase);
exports.userController = userController;
// Admin injection
const adminRepository = new adminRepository_1.AdminRepository(userModel_1.default, VerificationRequest_1.VerificationRequestModal, eventModel_1.default, reportRequest_1.default, postModel_1.default, notification_1.NotificationModel, groupModel_1.GroupModel);
const adminUseCase = new adminUseCase_1.AdminUseCase(adminRepository, jwt, hashPassword, sendEmail, s3Operations, io);
const adminController = new adminController_1.AdminController(adminUseCase);
exports.adminController = adminController;
// MESSAGE INJECTIONS
const messageRepository = new messageRepository_1.MessageRepository(conversation_1.default, message_1.default, userModel_1.default);
const messageUseCase = new messageUseCase_1.MessageUseCase(messageRepository, s3Operations);
const messageController = new messageController_1.MessageController(messageUseCase);
exports.messageController = messageController;
// EVENT INJECTIONs
const eventRepository = new eventRepository_1.EventRepository(eventModel_1.default, eventPaymentModel_1.EventPaymentModel, userModel_1.default);
const eventUseCase = new eventUseCase_1.EventUseCase(eventRepository, s3Operations, stripeService);
const eventController = new eventController_1.EventController(eventUseCase);
exports.eventController = eventController;
const groupRepository = new groupRepository_1.GroupRepository(groupModel_1.GroupModel, s3Operations, userModel_1.default, groupMessageModel_1.default);
const groupUseCase = new groupUseCase_1.GroupUseCase(groupRepository);
const groupController = new groupController_1.GroupController(groupUseCase);
exports.groupController = groupController;
