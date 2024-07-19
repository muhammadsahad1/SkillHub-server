import { Request, Response, NextFunction } from 'express';
import { JWTtoken } from '../../service/jwt';
import userModel from '../../database/mongoDB/model/userModel';
import { CustomRequest } from './request/customReq';
import { refreshTokenOption, accessTokenOption } from './jwt';

const jwt = new JWTtoken();

export const isAuthenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // Check for access token
  if (!accessToken) {
    return res.status(401).json({ message: "Not authorized, no access token" });
  }

  try {
    // Verify access token
    const decoded = await jwt.verifyJWT(accessToken, process.env.JWT_ACCESS_KEY);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user.id }; // Attach user to request
    return next();
    
  } catch (error: any) {
    console.log('Access token verification failed:', error.message);
    
    if (refreshToken) {
      try {
        const reDecoded = await jwt.verifyJWT(refreshToken, process.env.JWT_REFRESH_KEY);
        const newAccessToken = (await jwt.createAccessAndRefreshToken(reDecoded.id)).accessToken;

        // Set new access token as a cookie
        res.cookie('accessToken', newAccessToken, accessTokenOption);
        const user = await userModel.findById(reDecoded.id).select("-password");
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = { id: user.id };
        return next();
        
      } catch (refreshError : any) {
        console.log('Refresh token verification failed:', refreshError.message);
        return res.status(401).json({ message: 'Not authorized, invalid refresh token' });
      }
    } else {
      return res.status(401).json({ message: 'Not authorized, no refresh token' });
    }
  }
};
