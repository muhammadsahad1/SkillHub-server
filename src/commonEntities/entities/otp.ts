export interface Iotp {
  id?: string;
  username: string;
  userPassword: string;
  email: string;
  otp: string;
  createAt: Date;
  expiresAt: Date;
}
