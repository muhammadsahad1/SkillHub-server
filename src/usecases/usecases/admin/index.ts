import { adminLogin } from "./adminLogin.js";
import { getUsers } from "./getUsers.js";
import { blockUser } from "./blockUser.js";
import {getVerificationRequests} from './getVerificationRequests.js'
import { changeVerifyStatus } from "./changeVerifyStatus.js";
import { getEvents } from './getEvents.js'
import { changeEventsStatus } from './changeEventsStatus.js'
import { getReports } from './getReports.js'
import { reportAction } from './reportAction.js'
import { dashBoardData } from './dashBoardData.js'

export {
  adminLogin,
  getUsers,
  getVerificationRequests,
  changeVerifyStatus,
  getEvents,
  changeEventsStatus,
  getReports,
  reportAction,
  dashBoardData,
  blockUser
}