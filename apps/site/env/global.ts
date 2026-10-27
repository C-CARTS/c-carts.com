import { PublicEnvSchema } from "./schema";

export const globalEnv = PublicEnvSchema.parse({
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	NEXT_PUBLIC_MAX_IMAGE_SIZE: process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE,
});
