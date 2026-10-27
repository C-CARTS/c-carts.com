import { describe, expect, it } from "vitest";
import { sanitizeTimetable } from "../lib/sanitize-timetable";

describe("sanitizeTimetable", () => {
	it("preserves supported table markup and styling hooks", () => {
		const html =
			'<div class="westbound"><table id="rantoulW"><thead><tr><th scope="col">Stop</th></tr></thead><tbody><tr><td rowspan="2">Downtown</td></tr></tbody></table></div>';

		expect(sanitizeTimetable(html)).toBe(html);
	});

	it("removes executable elements, event handlers, unsafe attributes, and embedded content", () => {
		const html =
			'<table onclick="alert(1)"><tr><td><img src=x onerror=alert(1)><script>alert(1)</script><a href="javascript:alert(1)">link</a><svg onload="alert(1)"><circle></circle></svg><iframe src="https://attacker.example"></iframe></td></tr></table>';

		expect(sanitizeTimetable(html)).toBe("<table><tr><td>link</td></tr></table>");
	});
});
