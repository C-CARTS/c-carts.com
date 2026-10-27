import nextEnv from "@next/env";
import { PublicEnvSchema, ServerEnvSchema } from "../env/schema";
import { studioRedirects } from "../lib/studio-routing";

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV === "development");
const publicEnv = PublicEnvSchema.parse(process.env);
const env = ServerEnvSchema.parse(process.env);
studioRedirects(env.STUDIO_ORIGIN, { siteOrigin: publicEnv.NEXT_PUBLIC_BASE_URL });
console.info("Site environment validated");
