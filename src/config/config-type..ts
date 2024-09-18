export type Config = {
  app: AppConfig;
  pg: PostgresConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
  bcrypt: BcryptConfig;
  admin: AdminConfig;
  mailer: MailerConfig;
  aws: AwsConfig;
};

export type AppConfig = {
  host: string;
  port: number;
};

export type PostgresConfig = {
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpireIn: number;
  refreshSecret: string;
  refreshExpireIn: number;
};

export type BcryptConfig = {
  countOfSalt: number;
};

export type AdminConfig = {
  name: string;
  password: string;
  email: string;
};

export type MailerConfig = {
  smtpEmail: string;
  smtpPass: string;
};
export type AwsConfig = {
  access: string;
  secretKey: string;
  bucketName: string;
  endpoint: string;
  bucketUrl: string;
  region: string;
};
