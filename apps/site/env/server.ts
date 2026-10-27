import "server-only";
import { ServerEnvSchema } from "./schema";

export const serverEnv = ServerEnvSchema.parse(process.env);
