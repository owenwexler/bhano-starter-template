interface Env {
  POSTGRES_URL: string;
  REDIS_URL: string;
  CACHE_KEY_PREFIX: string;
  NODE_ENV: string;
  HOST: string;
  PORT: number;
}

export type {
  Env
}
