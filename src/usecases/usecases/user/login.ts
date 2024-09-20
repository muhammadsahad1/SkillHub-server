import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { IToken, Ijwt } from "../../interface/service/jwt.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IhashPassword } from "../../interface/service/hashPassword.js";
import { ErrorHandler } from '../../middlewares/errorMiddleware.js' ;
import { Iuser } from "../../../commonEntities/entities/user.js";

export const login = async (
  userRepository: IuserRepository,
  jwt: Ijwt,
  hashedPassword: IhashPassword,
  email: string,
  password: string, 
  picture: string | undefined,
  next: Next,
): Promise<{
  fetchUser?: Iuser | void;
  tokens: { accessToken: string; refreshToken: string };
} | void> => {
  try {
    let fetchUser = await userRepository.findByEmail(email);
    if (!fetchUser) {
      return next(new ErrorHandler(400, "User does not exist"));
    } 
    console.log("fetchUser ",fetchUser)

    if (picture) {
      fetchUser = await userRepository.findByEmailUpdateOne(email, picture);
      const tokens = await jwt.createAccessAndRefreshToken(fetchUser?.id as string);
    return { fetchUser, tokens };
    }

    if (!fetchUser) {
      return next(new ErrorHandler(400, "User does not exist"));
    }

    if (fetchUser.blocked) {
      return next(new ErrorHandler(400, "Your account has been blocked"));
    }

    const checked = await hashedPassword.comparePassword(password, fetchUser.password);
    if (!checked) {
      return next(new ErrorHandler(400, "Invalid password"));
    }
    
    const tokens = await jwt.createAccessAndRefreshToken(fetchUser.id as string);
    
    return { fetchUser, tokens };
  } catch (error) {
    return next(new ErrorHandler(500, "An error occurred during login"));
  }
};
