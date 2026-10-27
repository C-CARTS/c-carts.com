import { rmSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = relative(root, process.cwd()).replaceAll("\\", "/");
const outputs: Record<string, readonly string[]> = {
	"apps/site": [".next", "tsconfig.tsbuildinfo", "next-env.d.ts"],
	"apps/cms": ["dist", ".sanity", "schema.json", "tsconfig.tsbuildinfo"],
	"packages/sanity-definitions": ["tsconfig.tsbuildinfo"],
	"packages/types": ["sanity-types.ts", "tsconfig.tsbuildinfo"],
};
const allowed = outputs[workspace];
const targets = process.argv.slice(2);
if (!allowed || !targets.length || targets.some((target) => !allowed.includes(target))) {
	throw new Error(`Unsupported cleanup targets for workspace ${workspace}`);
}
for (const target of targets) {
	rmSync(resolve(process.cwd(), target), { recursive: true, force: true });
}
