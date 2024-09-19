import { userController } from "../../webServer/injections/injection.js";
import upload from "../middleware/multer.js";
import { isAuthenticate } from "../middleware/auth.js";
// >>>>>>>>>>>>>>>>>>>>>>>>>> User Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function userRoute(route) {
    // Authentication Routes
    route.post("/register", (req, res, next) => userController.userSignup(req, res, next));
    route.post("/createUser", (req, res, next) => userController.createUser(req, res, next));
    route.post("/resentOtp", (req, res, next) => userController.resentOtp(req, res, next));
    route.post("/login", (req, res, next) => userController.login(req, res, next));
    route.post("/googleLogin", (req, res, next) => userController.googleLogin(req, res, next));
    route.post("/forgotPassword", (req, res, next) => userController.forgotPassword(req, res, next));
    route.post("/resetPassword", (req, res, next) => userController.resetPassword(req, res, next));
    //verify requesting for proffessinal account
    route.post('/verification-request', isAuthenticate, (req, res, next) => userController.verifyRequest(req, res, next));
    // Profile Routes
    route.post("/createProfile", upload.single("profileImage"), isAuthenticate, (req, res, next) => userController.createProfile(req, res, next));
    route.post("/changePassword", isAuthenticate, (req, res, next) => userController.changePassword(req, res, next));
    route.get("/profileImage", isAuthenticate, (req, res, next) => userController.getProfileImage(req, res, next));
    route.post("/coverImage", upload.single("coverImage"), isAuthenticate, (req, res, next) => userController.uploadCoverimage(req, res, next));
    route.post("/accountPrivacy", isAuthenticate, (req, res, next) => userController.changePrivacy(req, res, next));
    route.post("/showNotification", isAuthenticate, (req, res, next) => userController.showNotification(req, res, next));
    // Skill-related Routes
    route.get("/getSkillRelatedUsers", isAuthenticate, (req, res, next) => userController.getUsers(req, res, next));
    route.get("/getUserDetails", isAuthenticate, (req, res, next) => userController.getUserDetails(req, res, next));
    // Follow/Unfollow Routes
    route.post("/followup", isAuthenticate, (req, res, next) => userController.userFollowUp(req, res, next));
    route.get("/getMyFollowings", isAuthenticate, (req, res, next) => userController.getMyFollowings(req, res, next));
    route.post("/unFollow", isAuthenticate, (req, res, next) => userController.unFollow(req, res, next));
    route.get("/followers", isAuthenticate, (req, res, next) => userController.myFollowers(req, res, next));
    route.post("/follower", isAuthenticate, (req, res, next) => userController.removeFollower(req, res, next));
    route.post("/followBack", isAuthenticate, (req, res, next) => userController.followback(req, res, next));
    route.get('/othersFollowers', isAuthenticate, (req, res, next) => userController.fetchOtherFollowers(req, res, next));
    route.get('/othersFollowings', isAuthenticate, (req, res, next) => userController.fetchOtherFollowings(req, res, next));
    route.get('/OthersPosts', isAuthenticate, (req, res, next) => userController.fetchOthersPosts(req, res, next));
    // UploadPost/
    route.post('/uploadPost', upload.single("postImage"), isAuthenticate, (req, res, next) => userController.uploadPost(req, res, next));
    route.get('/posts', isAuthenticate, (req, res, next) => userController.fetchPosts(req, res, next));
    route.delete('/posts', isAuthenticate, (req, res, next) => userController.deletePost(req, res, next));
    route.post('/post', isAuthenticate, (req, res, next) => userController.editPost(req, res, next));
    route.post('/postLike', isAuthenticate, (req, res, next) => userController.postLike(req, res, next));
    route.get('/myPosts', isAuthenticate, (req, res, next) => userController.fetchMyPosts(req, res, next));
    route.post('/addComment', isAuthenticate, (req, res, next) => userController.addComment(req, res, next));
    route.delete('/deleteComment', isAuthenticate, (req, res, next) => userController.deleteComment(req, res, next));
    route.put('/editComment', isAuthenticate, (req, res, next) => userController.editingComment(req, res, next));
    route.get('/viewPost', isAuthenticate, (req, res, next) => userController.postView(req, res, next));
    route.post('/postThoughts', isAuthenticate, (req, res, next) => userController.uploadThoughts(req, res, next));
    route.post('/report', isAuthenticate, (req, res, next) => userController.reportPost(req, res, next));
    // users search
    route.get('/searchUser', isAuthenticate, (req, res, next) => userController.searchUsers(req, res, next));
    // Logout Route
    route.post("/logout", isAuthenticate, (req, res, next) => userController.userLogout(req, res, next));
    return route;
}
