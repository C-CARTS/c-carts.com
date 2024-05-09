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
		console.info("Revalidating", { id, type, slug });

		switch (type) {
			case "page":
				if (slug?.current === HOMEPAGE_NAME) {
					revalidatePath("/");
				} else if (slug?.current) {
					revalidatePath(`/${slug.current}`);
				} else {
					console.warn("No slug.current in post", { slug });
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

		return new Response(`Revalidated "${type}" with slug "${slug?.current}"`, {
			status: 200,
		});
	} catch (err) {
		return new Response("Error revalidating", { status: 500 });
	}
}
