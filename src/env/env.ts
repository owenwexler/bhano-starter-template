import { getTypedEnv } from "./getTypedEnv";

export const env = getTypedEnv(Bun.env as { [key: string]: unknown });
