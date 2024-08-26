import { IhashPassword } from "../../interface/service/hashPassword";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Ijwt } from "../../interface/service/jwt";
import { ErrorHandler } from "../../middlewares/errorMiddleware";
import { Next } from "../../../framework/types/serverPackageType";

export const adminLogin = async (
  email: string,
  password: string,
  jwt: Ijwt,
  hashedPassword: IhashPassword,
  adminRepository: IadminRepository,
  next: Next
) => {
  const admin = await adminRepository.adminLogin(email);
  // ensure admin
  if (admin?.role === "user") {
    console.log("is user");
    return next(new ErrorHandler(403, "Not authorized"));
  } else {
    // campare for ensure the admin password
    const match = await hashedPassword.comparePassword(
      password,
      admin?.password
    );

    if (!match) {
      return next(new ErrorHandler(401, "Invalid email or password"));
    }
    // generating token
    const Tokens = await jwt.createAccessAndRefreshToken(admin?.id as string);
    console.log("Tokenssssss => admin ==>",Tokens)
    return {
      success: true,
      tokens: Tokens,
      message: "successfully authorized admin",
      admin: {  
        _id: admin?._id,
        email: admin?.email,
      },
    };
  }
};
