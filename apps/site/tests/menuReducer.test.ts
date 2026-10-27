import { describe, expect, it } from "vitest";
import { Actions, reducer, StateDefaults } from "../components/nav/menuReducer";

describe("navigation menu reducer", () => {
	it("opens and closes the first menu when its button is toggled", () => {
		const open = reducer(StateDefaults, { type: Actions.MenuButtonClicked, clickedIndex: 0 });

		expect(open.openIndexState).toBe(0);
		expect(reducer(open, { type: Actions.MenuButtonClicked, clickedIndex: 0 }).openIndexState).toBeNull();
	});

	it("switches directly between open menus", () => {
		const openFirst = reducer(StateDefaults, { type: Actions.MenuButtonClicked, clickedIndex: 0 });

		expect(reducer(openFirst, { type: Actions.MenuButtonClicked, clickedIndex: 1 }).openIndexState).toBe(1);
	});

	it("closes on an outside click without requesting focus on the menu button", () => {
		const open = reducer(StateDefaults, { type: Actions.MenuButtonClicked, clickedIndex: 0 });
		const closed = reducer(open, { type: Actions.ClickedOutsideMenu });

		expect(closed.openIndexState).toBeNull();
		expect(closed.focusIndexState).toBeNull();
	});
});
