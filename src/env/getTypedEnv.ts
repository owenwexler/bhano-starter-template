import type { Env } from "../typedefs/Env";
import { environmentVariableList } from "./environmentVariableList";

const getTypedEnv = (env: { [key: string]: unknown }): Env => {
  for (const variable of environmentVariableList) {
    if (!env[variable]) {
      // a blank REDIS_URL is interpreted as missing for some reason so this is the workaround
      if (variable === 'REDIS_URL' && env.REDIS_URL === '') {
        continue;
      } else {
        console.error('Missing environment variable: ', variable);
        throw new Error('Missing environment variables');
      }
    }
  }

  const resultEnv: { [key: string]: unknown } = {};

  for (const variable of environmentVariableList) {
    if (variable === 'PORT') {
      resultEnv['PORT'] = Number(env.PORT);
    } else if (variable === 'REDIS_URL') {
      resultEnv['REDIS_URL'] = env.REDIS_URL || 'redis://localhost:6379';
    } else {
      resultEnv[variable] = env[variable];
    }
  }

  return resultEnv as unknown as Env;
};

export { getTypedEnv }
