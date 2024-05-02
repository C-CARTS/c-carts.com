import type { Reference, SanityDocument, Slug } from "sanity";

type NavItem = SanityDocument & {
	_type: "navItem";
	title: string;
	slug: Slug;
	children: Reference[];
};

export default NavItem;
