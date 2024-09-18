import * as process from 'node:process';

import { Config } from './config-type.';

export default (): Config => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
  },
  pg: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dbName: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpireIn: Number(process.env.ACCESS_EXPIRE_IN),
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpireIn: Number(process.env.REFRESH_EXPIRE_IN),
  },
  bcrypt: {
    countOfSalt: Number(process.env.CAUNT_OF_SALT),
  },
  admin: {
    name: process.env.ADMIN_NAME,
    password: process.env.ADMIN_PASSWORD,
    email: process.env.ADMIN_EMAIL,
  },
  mailer: {
    smtpEmail: process.env.SMTP_EMAIL,
    smtpPass: process.env.SMTP_PASSWORD,
  },
  aws: {
    access: process.env.AWS_S3_ACCESS_KEY,
    secretKey: process.env.AWS_S3_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    endpoint: process.env.AWS_S3_ENDPOINT,
    bucketUrl: process.env.AWS_S3_BUCKET_URL,
    region: process.env.AWS_S3_REGION,
  },
});
