import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { userController } from "../../webServer/injections/injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";

// >>>>>>>>>>>>>>>>>>>>>>>>>> User Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function userRoute(route: Route): Route {
  // Authentication Routes
  route.post("/register", (req: Req, res: Res, next: Next) => userController.userSignup(req, res, next));
  route.post("/createUser", (req: Req, res: Res, next: Next) => userController.createUser(req, res, next));
  route.post("/resentOtp", (req: Req, res: Res, next: Next) => userController.resentOtp(req, res, next));
  route.post("/login", (req: Req, res: Res, next: Next) => userController.login(req, res, next));
  route.post("/googleLogin", (req: Req, res: Res, next: Next) => userController.googleLogin(req, res, next));
  route.post("/forgotPassword", (req: Req, res: Res, next: Next) => userController.forgotPassword(req, res, next));
  route.post("/resetPassword", (req: Req, res: Res, next: Next) => userController.resetPassword(req, res, next));
  
  // Profile Routes
  route.post("/createProfile", upload.single("profileImage"), isAuthenticate, (req: Req, res: Res, next: Next) => userController.createProfile(req, res, next));
  route.post("/changePassword", isAuthenticate, (req: Req, res: Res, next: Next) => userController.changePassword(req, res, next));
  route.get("/profileImage", isAuthenticate, (req: Req, res: Res, next: Next) => userController.getProfileImage(req, res, next));
  route.post("/coverImage", upload.single("coverImage"), isAuthenticate, (req: Req, res: Res, next: Next) => userController.uploadCoverimage(req, res, next));
  route.post("/accountPrivacy", isAuthenticate, (req: Req, res: Res, next: Next) => userController.changePrivacy(req, res, next));
  route.post("/showNotification", isAuthenticate, (req: Req, res: Res, next: Next) => userController.showNotification(req, res, next));
  // Skill-related Routes
  route.get("/getSkillRelatedUsers",isAuthenticate, (req: Req, res: Res, next: Next) => userController.getUsers(req, res, next));
  route.get("/getUserDetails", isAuthenticate, (req: Req, res: Res, next: Next) => userController.getUserDetails(req, res, next));
  
  // Follow/Unfollow Routes
  route.post("/followup", isAuthenticate, (req: Req, res: Res, next: Next) => userController.userFollowUp(req, res, next));
  route.get("/getMyFollowings", isAuthenticate, (req: Req, res: Res, next: Next) => userController.getMyFollowings(req, res, next));
  route.post("/unFollow", isAuthenticate, (req: Req, res: Res, next: Next) => userController.unFollow(req, res, next));
  route.get("/followers", isAuthenticate, (req: Req, res: Res, next: Next) => userController.myFollowers(req, res, next));
  route.post("/follower", isAuthenticate, (req: Req, res: Res, next: Next) => userController.removeFollower(req, res, next));
  route.post("/followBack", isAuthenticate, (req: Req, res: Res, next: Next) => userController.followback(req, res, next));
  route.get('/othersFollowers',isAuthenticate,(req: Req, res: Res, next: Next) => userController.fetchOtherFollowers(req, res, next));
  route.get('/othersFollowings',isAuthenticate,(req: Req, res: Res, next: Next) => userController.fetchOtherFollowings(req, res, next));
  route.get('/OthersPosts', isAuthenticate, (req: Req, res: Res, next: Next) => userController.fetchOthersPosts(req, res, next));
  
  // UploadPost/
  route.post('/uploadPost',upload.single("postImage"),isAuthenticate,(req: Req, res: Res, next: Next) => userController.uploadPost(req,res,next));
  route.get('/posts',isAuthenticate,(req: Req, res: Res, next: Next) => userController.fetchPosts(req,res,next));
  route.delete('/posts',isAuthenticate,(req: Req, res: Res, next: Next) => userController.deletePost(req,res,next));
  route.post('/post',isAuthenticate,(req: Req, res: Res, next: Next) => userController.editPost(req,res,next));
  route.post('/postLike',isAuthenticate,(req: Req, res: Res, next: Next) => userController.postLike(req,res,next));
  route.get('/myPosts',isAuthenticate,(req: Req, res: Res, next: Next) => userController.fetchMyPosts(req,res,next));
  route.post('/addComment',isAuthenticate,(req: Req, res: Res, next: Next) => userController.addComment(req,res,next));
  route.delete('/deleteComment',isAuthenticate,(req: Req, res: Res, next: Next) => userController.deleteComment(req,res,next));
  route.put('/editComment',isAuthenticate,(req: Req, res: Res, next: Next) => userController.editingComment(req,res,next));

  // Logout Route
  route.post("/logout", isAuthenticate, (req: Req, res: Res, next: Next) => userController.userLogout(req, res, next));

  return route;
}
