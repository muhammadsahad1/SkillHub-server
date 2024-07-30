import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { userController } from "../../webServer/injections/injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";

// >>>>>>>>>>>>>>>>>>>>>>>>>> User Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function userRoute(route: Route): Route {
  route.post("/register", (req: Req, res: Res, next: Next) => {
    userController.userSignup(req, res, next);
  });

  route.post("/createUser", (req: Req, res: Res, next: Next) => {
    userController.createUser(req, res, next);
  });

  route.post("/resentOtp", (req: Req, res: Res, next: Next) => {
    userController.resentOtp(req, res, next);
  });

  route.post("/login", (req: Req, res: Res, next: Next) => {
    userController.login(req, res, next);
  });

  route.post("/googleLogin", (req: Req, res: Res, next: Next) => {
    userController.googleLogin(req, res, next);
  });

  route.post("/forgotPassword", (req: Req, res: Res, next: Next) => {
    userController.forgotPassword(req, res, next);
  });

  route.post("/resetPassword", (req: Req, res: Res, next: Next) => {
    userController.resetPassword(req, res, next);
  });

  route.post(
    "/createProfile",
    upload.single("profileImage"),
    (req: Req, res: Res, next: Next) => {
      userController.createProfile(req, res, next);
    }
  );

  route.post(
    "/changePassword",
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      userController.changePassword(req, res, next);
    }
  );

  route.get(
    "/profileImage",
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      userController.getProfileImage(req, res, next);
    }
  );

  route.post(
    "/coverImage",
    upload.single("coverImage"),
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      userController.uploadCoverimage(req, res, next);
    }
  );

  route.post(
    "/accountPrivacy",
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      userController.changePrivacy(req, res, next);
    }
  );

  route.post(
    "/showNotification",
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      userController.showNotification(req, res, next);
    }
  );

  route.get(
    "/getSkillRelatedUsers",
    isAuthenticate,
    (req: Req, res: Res, next: Next) => {
      console.log("controlleril vann")
      userController.getSkillRelatedUsers(req, res, next);
    }
  );

  route.post("/logout", isAuthenticate, (req: Req, res: Res, next: Next) => {
    userController.userLogout(req, res, next);
  });

  return route;
}
