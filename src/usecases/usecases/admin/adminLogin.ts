import { IhashPassword } from "../../interface/service/hashPassword.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { Ijwt } from "../../interface/service/jwt.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
import { Next } from "../../../framework/types/serverPackageType.js";

export const adminLogin = async (
  email: string,
  password: string,
  jwt: Ijwt,
  hashedPassword: IhashPassword,
  adminRepository: IadminRepository,
  next: Next
) => {
  const admin = await adminRepository.adminLogin(email);
  console.log("admin ={>>>",admin)
  // ensure admin
  if (admin?.role === "user") {
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
    const Tokens = await jwt.createAccessAndRefreshToken(admin?._id as string);
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
