import { RedisClient } from "bun";
import { env } from "../env/env";

const redisUrl = env.REDIS_URL && env.REDIS_URL !== '' ? env.REDIS_URL : 'redis://localhost:6379';

const redisClient = new RedisClient(redisUrl);

export default redisClient;
