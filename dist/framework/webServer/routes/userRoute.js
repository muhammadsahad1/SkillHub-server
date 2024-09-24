"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = userRoute;
const injection_1 = require("../../webServer/injections/injection");
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = require("../middleware/auth");
// >>>>>>>>>>>>>>>>>>>>>>>>>> User Route <<<<<<<<<<<<<<<<<<<<<<<<<
function userRoute(route) {
    // Authentication Routes
    route.post("/register", (req, res, next) => injection_1.userController.userSignup(req, res, next));
    route.post("/createUser", (req, res, next) => injection_1.userController.createUser(req, res, next));
    route.post("/resentOtp", (req, res, next) => injection_1.userController.resentOtp(req, res, next));
    route.post("/login", (req, res, next) => injection_1.userController.login(req, res, next));
    route.post("/googleLogin", (req, res, next) => injection_1.userController.googleLogin(req, res, next));
    route.post("/forgotPassword", (req, res, next) => injection_1.userController.forgotPassword(req, res, next));
    route.post("/resetPassword", (req, res, next) => injection_1.userController.resetPassword(req, res, next));
    //verify requesting for proffessinal account
    route.post('/verification-request', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.verifyRequest(req, res, next));
    // Profile Routes
    route.post("/createProfile", multer_1.default.single("profileImage"), auth_1.isAuthenticate, (req, res, next) => injection_1.userController.createProfile(req, res, next));
    route.post("/changePassword", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.changePassword(req, res, next));
    route.get("/profileImage", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.getProfileImage(req, res, next));
    route.post("/coverImage", multer_1.default.single("coverImage"), auth_1.isAuthenticate, (req, res, next) => injection_1.userController.uploadCoverimage(req, res, next));
    route.post("/accountPrivacy", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.changePrivacy(req, res, next));
    route.post("/showNotification", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.showNotification(req, res, next));
    // Skill-related Routes
    route.get("/getSkillRelatedUsers", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.getUsers(req, res, next));
    route.get("/getUserDetails", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.getUserDetails(req, res, next));
    // Follow/Unfollow Routes
    route.post("/followup", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.userFollowUp(req, res, next));
    route.get("/getMyFollowings", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.getMyFollowings(req, res, next));
    route.post("/unFollow", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.unFollow(req, res, next));
    route.get("/followers", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.myFollowers(req, res, next));
    route.post("/follower", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.removeFollower(req, res, next));
    route.post("/followBack", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.followback(req, res, next));
    route.get('/othersFollowers', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.fetchOtherFollowers(req, res, next));
    route.get('/othersFollowings', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.fetchOtherFollowings(req, res, next));
    route.get('/OthersPosts', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.fetchOthersPosts(req, res, next));
    // UploadPost/
    route.post('/uploadPost', multer_1.default.single("postImage"), auth_1.isAuthenticate, (req, res, next) => injection_1.userController.uploadPost(req, res, next));
    route.get('/posts', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.fetchPosts(req, res, next));
    route.delete('/posts', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.deletePost(req, res, next));
    route.post('/post', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.editPost(req, res, next));
    route.post('/postLike', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.postLike(req, res, next));
    route.get('/myPosts', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.fetchMyPosts(req, res, next));
    route.post('/addComment', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.addComment(req, res, next));
    route.delete('/deleteComment', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.deleteComment(req, res, next));
    route.put('/editComment', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.editingComment(req, res, next));
    route.get('/viewPost', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.postView(req, res, next));
    route.post('/postThoughts', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.uploadThoughts(req, res, next));
    route.post('/report', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.reportPost(req, res, next));
    // users search
    route.get('/searchUser', auth_1.isAuthenticate, (req, res, next) => injection_1.userController.searchUsers(req, res, next));
    // Logout Route
    route.post("/logout", auth_1.isAuthenticate, (req, res, next) => injection_1.userController.userLogout(req, res, next));
    return route;
}
