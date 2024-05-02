import type { SanityDocument, Slug } from "sanity";

type NavItem = SanityDocument & {
	_type: "navItem";
	title: string;
	slug: Slug;
	children: {
		_id: string;
		title: string;
		slug: Slug;
	}[];
};

export default NavItem;
