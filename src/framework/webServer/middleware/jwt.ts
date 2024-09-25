const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "200",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1300",
  10
);

interface ItokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

const tokenProductionMode = process.env.NODE_ENV === "production";

export const accessTokenOption: ItokenOption = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: tokenProductionMode ? "none" : "lax", // Use lowercase 'none'
  secure: tokenProductionMode,
};

export const refreshTokenOption: ItokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: tokenProductionMode ? "none" : "lax",
  secure: tokenProductionMode,
};

export const roleOptions: ItokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: tokenProductionMode ? "none" : "lax",
  secure: tokenProductionMode,
};
