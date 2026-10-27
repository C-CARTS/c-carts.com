import nextEnv from "@next/env";
import { PublicEnvSchema, ServerEnvSchema } from "../env/schema";
import { studioRewrites } from "../lib/studio-routing";

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV === "development");
PublicEnvSchema.parse(process.env);
const env = ServerEnvSchema.parse(process.env);
studioRewrites(env.STUDIO_ORIGIN);
if (new URL(env.STUDIO_ORIGIN).origin === new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "").origin) {
	throw new Error("STUDIO_ORIGIN must not point back to the public site");
}
console.info("Site environment validated");
