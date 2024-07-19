declare namespace NodeJS {
  interface ProcessEnv {
    JWT_VERIFICATION_KEY: string;
    JWT_ACCESS_KEY: string;
    JWT_REFRESH_KEY: string;
    ACCESS_TOKEN_EXPIRE: string;
    REFRESH_TOKEN_EXPIRE: string;
    NODE_ENV: string;
    COOKIE_SAMESITE: string;
    PORT: string;
    VITE_BASE_URL: string;
    MONGO_URL: string;
    MAILER_EMAIL: string;
    MAILER_PASS: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    CLOUD_NAME: string;
    CLOUD_API_SECRET: string;
    CLOUD_API_KEY: string;
    C3_ACCESS_KEY: string;
    C3_SCERET_KEY: string;
    C3_BUCKET_REGION: string;
    C3_BUCKET_NAME: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CLIENT_URL : string;
    JWT_SECRET: string;

  }
}
