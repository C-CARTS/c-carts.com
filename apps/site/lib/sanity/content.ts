import { z } from "zod";

export const ImageDetailsSchema = z.object({
	url: z.url(),
	metadata: z.object({
		dimensions: z.object({
			width: z.number().positive(),
			height: z.number().positive(),
			aspectRatio: z.number().positive(),
		}),
		lqip: z.string().optional().default(""),
	}),
});

export const FileDetailsSchema = z.object({
	url: z.url(),
	originalFilename: z.string().min(1),
	extension: z.string().min(1),
	size: z.number().nonnegative(),
});
