import * as process from 'node:process';

import { Config } from './config-type.';

export default (): Config => ({
  app: {
    host: process.env.APP_HOST,
    port: Number(process.env.APP_PORT),
  },
});
