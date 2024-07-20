import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { userController } from "../injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";

export function userRoute(route: Route) {

  route.post("/register", (req: Req, res: Res, next: Next) => {
    console.log("register route");
    userController.userSignup(req, res, next);
  });

  route.post("/createUser", (req: Req, res: Res, next: Next) => {
    userController.createUser(req, res, next);
  });

  route.post('/resentOtp',(req: Req,res : Res,next : Next) => {
    userController.resentOtp(req,res,next)
  });

  route.post('/login',(req : Req , res : Res, next : Next) => {
    userController.login(req,res,next)
  })

  route.post('/googleLogin',(req : Req , res : Res , next : Next) => {
    userController.googleLogin(req,res,next)
  })

  route.post('/forgotPassword',(req : Req , res : Res , next : Next)=> {
    console.log("comming in forgotpass route")
    userController.forgotPassword(req,res,next)
  })

  route.post('/createProfile',upload.single('profileImage'),(req :Req,res : Res , next :Next) =>{
    userController.createProfile(req,res,next)
  })

  route.post('/logout',(req :Req,res : Res , next :Next)=>{
    userController.userLogout(req,res,next)

  })
  return route;
}
