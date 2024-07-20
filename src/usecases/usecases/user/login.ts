import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IToken, Ijwt } from "../../interface/service/jwt";
import { Next } from "../../../framework/types/serverPackageType";
import { IhashPassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middlewares/errorHandler";

export const login = async (
  userRepository: IuserRepository,
  jwt: Ijwt,
  hashedPassword: IhashPassword,
  email: string,
  password: string,
  picture: string | undefined,
  next: Next,
) => {
  try {
    let fetchUser = await userRepository.findByEmail(email);
    if (!fetchUser) {
      return next(new ErrorHandler(400, "User does not exist"));
    }

    if (picture) {
      fetchUser = await userRepository.findByEmailUpdateOne(email, picture);
      console.log("fetched User =>",fetchUser)
      const tokens = await jwt.createAccessAndRefreshToken(fetchUser?.id as string);
    console.log("tokenn after googleLogin  ===>",tokens)
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
    console.log("tokenn after googleLogin  ===>",tokens)
    return { fetchUser, tokens };
  } catch (error) {
    return next(new ErrorHandler(500, "An error occurred during login"));
  }
};
