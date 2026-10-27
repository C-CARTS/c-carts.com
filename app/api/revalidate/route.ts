import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { Slug } from "sanity";
import throwError from "../../../helpers/throwError";

const SECRET =
	process.env.SANITY_WEBHOOK_SECRET ??
	throwError("Missing environment variable: SANITY_WEBHOOK_SECRET");

const HOMEPAGE_NAME =
	process.env.NEXT_PUBLIC_HOMEPAGE_DOC_NAME ??
	throwError("Missing environment variable: NEXT_PUBLIC_HOMEPAGE_DOC_NAME");

const NEXT_PUBLIC_SETTINGS_DOC_NAME =
	process.env.NEXT_PUBLIC_SETTINGS_DOC_NAME ??
	throwError("Missing environment variable: NEXT_PUBLIC_SETTINGS_DOC_NAME");

export async function POST(req: NextRequest) {
	const { body, isValidSignature } = await parseBody<{
		_id: string;
		_type: string;
		slug?: Slug;
	}>(req, SECRET);

	if (!isValidSignature) {
		return new Response("Invalid Signature", { status: 401 });
	}

	if (!body?._type) {
		return new Response("Bad Request", { status: 400 });
	}

	try {
		const { _id: id, _type: type, slug } = body;
		const slugValue = slug?.current;
		console.info("Revalidating", { id, type, slug: slugValue });

		switch (type) {
			case "page":
				// Fixed pages (homepage, jobs, news, performance) are tagged by _id; others by slug.
				revalidateTag(`page-${id}`);
				if (id === HOMEPAGE_NAME) {
					revalidatePath("/");
				}
				if (slugValue) {
					revalidateTag(`page-${slugValue}`);
					revalidatePath(`/${slugValue}`);
				} else {
					console.warn("No slug.current in post", { slug });
				}
				break;
			case "news":
				revalidateTag("news");
				if (slugValue) {
					revalidateTag(`news-${slugValue}`);
					revalidatePath(`/news/${slugValue}`);
				}
				break;
			case "gtfsFeed":
				revalidateTag("gtfsFeed");
				break;
			case "performance":
				revalidateTag("performance");
				break;
			case "job":
				revalidateTag("jobs");
				if (slugValue) {
					revalidateTag(`jobs-${slugValue}`);
					revalidatePath(`/jobs/${slugValue}`);
				}
				break;
			case NEXT_PUBLIC_SETTINGS_DOC_NAME:
				revalidateTag(NEXT_PUBLIC_SETTINGS_DOC_NAME);
				break;

			case "navItem":
				revalidateTag("nav");
				break;
			case "sanity.imageAsset":
				revalidateTag("images");
				break;
			default:
				return new Response(`No managed type: ${type}`, { status: 304 });
		}

		return new Response(`Revalidated "${type}" with slug "${slugValue}"`, {
			status: 200,
		});
	} catch (err) {
		return new Response("Error revalidating", { status: 500 });
	}
}
