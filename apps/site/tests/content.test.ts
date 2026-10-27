import { describe, expect, it } from "vitest";
import { FileDetailsSchema, ImageDetailsSchema } from "../lib/sanity/content";

describe("asset boundaries", () => {
	it("requires valid dimensions instead of asserting optional asset metadata", () => {
		expect(ImageDetailsSchema.safeParse({ url: "https://cdn.sanity.io/image.png" }).success).toBe(false);
		const asset = ImageDetailsSchema.parse({
			url: "https://cdn.sanity.io/image.png",
			metadata: { dimensions: { width: 200, height: 100, aspectRatio: 2 } },
		});
		expect(asset.metadata.lqip).toBe("");
	});
	it("rejects incomplete downloaded-file metadata", () => {
		expect(FileDetailsSchema.safeParse({ url: "https://cdn.sanity.io/file.pdf" }).success).toBe(false);
		expect(
			FileDetailsSchema.safeParse({
				url: "https://cdn.sanity.io/file.pdf",
				originalFilename: "file.pdf",
				extension: "pdf",
				size: 100,
			}).success,
		).toBe(true);
	});
});
