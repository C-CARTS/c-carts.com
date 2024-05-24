import path from "path";

const buildEslintCommand = (filenames) => {
	const relativePaths = filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" --file ");
	return `next lint --fix --file ${relativePaths}`;
};

const config = {
	"package-lock.json": () => "echo 'Ignoring package-lock.json'",
	"**/*.{ts,tsx}": () => "npx tsc --noEmit",
	"**/*.{js,jsx,ts,tsx,mjs}": (filenames) => [buildEslintCommand(filenames)],
	"**/*.{md,json}": (filenames) =>
		`npx prettier --write ${filenames.join(" ")}`,
};

export default config;
