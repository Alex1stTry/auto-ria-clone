import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import getter from './src/config/configuration';

dotenv.config({ path: './environments/local.env' });

const dbConfig = getter().pg;

export default new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.dbName,
  entities: [
    path.join(process.cwd(), 'dist', 'src', 'database', 'entities', '*.js'),
  ],
  migrations: [
    path.join(process.cwd(), 'dist', 'src', 'database', 'migrations', '*.js'),
  ],
  synchronize: false,
});
