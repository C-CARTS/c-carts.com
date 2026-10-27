import sanitizeHtml from "sanitize-html";

const timetableTags = [
	"b",
	"br",
	"caption",
	"col",
	"colgroup",
	"div",
	"em",
	"h1",
	"h2",
	"h3",
	"i",
	"p",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"tr",
];

export function sanitizeTimetable(html: string): string {
	return sanitizeHtml(html, {
		allowedTags: timetableTags,
		allowedAttributes: {
			"*": ["class", "id"],
			col: ["span", "width"],
			td: ["colspan", "headers", "rowspan", "scope", "width"],
			th: ["colspan", "headers", "rowspan", "scope", "width"],
		},
	});
}
