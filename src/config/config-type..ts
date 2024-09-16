export type Config = {
  app: AppConfig;
  pg: PostgresConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
  bcrypt: BcryptConfig;
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
