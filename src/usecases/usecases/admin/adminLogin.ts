import { IhashPassword } from "../../interface/service/hashPassword";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Ijwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";
import { Next } from "../../../framework/types/serverPackageType";

export const adminLogin = async (
  email: string,
  password: string,
  jwt : Ijwt,
  hashedPassword: IhashPassword,
  adminRepository : IadminRepository,
  next : Next,
) => {
  const admin = await adminRepository.adminLogin(email)
  if(admin?.role !== "admin"){
    return next(new ErrorHandler(403,"Not authorized"))
  }
  // campare for ensure the admin
  const hashPassword = await hashedPassword.createHash(password)
  const match = await hashedPassword.comparePassword(hashPassword,admin?.password)
  
  if(!match){
      return next(new ErrorHandler(401,"Invalid email or password"))
  }

  const Tokens = await jwt.createAccessAndRefreshToken(admin.id as string)
  console.log("Tokens +>",Tokens)
  return {
    success : true,
    tokens : Tokens,
    message : "successfully authorized admin",
    admin : {
      id : admin.id,
      email : admin.email
    }
  }
};
