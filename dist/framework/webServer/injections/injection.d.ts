import { AdminController } from "../../../commonEntities/controllers/adminController";
import { UserController } from "../../../commonEntities/controllers/userController";
import { MessageController } from "../../../commonEntities/controllers/messageController";
import { NotificationController } from "../../../commonEntities/controllers/notificationController";
import { EventController } from "../../../commonEntities/controllers/eventController";
import { GroupController } from "../../../commonEntities/controllers/groupController";
declare const notificationController: NotificationController;
declare const userController: UserController;
declare const adminController: AdminController;
declare const messageController: MessageController;
declare const eventController: EventController;
declare const groupController: GroupController;
export { adminController, userController, messageController, notificationController, eventController, groupController };
