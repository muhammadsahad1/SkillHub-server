import { Request, Response, NextFunction } from 'express';
import { JWTtoken } from '../../service/jwt';
import userModel from '../../database/mongoDB/model/userModel';
import { CustomRequest } from './request/customReq';
import { refreshTokenOption, accessTokenOption } from './jwt';

const jwt = new JWTtoken();

export const isAuthenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest;
  const accessToken = customReq.cookies.accessToken;
  const refreshToken = customReq.cookies.refreshToken;
  // Check for access token
  
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
    
    if (!accessToken) {
      console.log("not accesstoken")
      // return res.status(401).json({ message: "Not authorized, no access token" });
      if (refreshToken) {
        try {
  
        const reDecoded = await jwt.verifyJWT(refreshToken, process.env.JWT_REFRESH_KEY);
        const newTokens = await jwt.createAccessAndRefreshToken(reDecoded.id);
        
        // Set new access token and refresh token in cookie
        res.cookie('accessToken', newTokens.accessToken, accessTokenOption);
        res.cookie('refreashToken',newTokens.refreshToken,refreshTokenOption)
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
  }
};
