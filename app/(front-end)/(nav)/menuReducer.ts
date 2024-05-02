interface DefaultableState {
	openIndexState: number | null;
	focusIndexState: number | null;
}

interface PropState {}

export type State = Readonly<DefaultableState & PropState>;

export enum Actions {
	// eslint-disable-next-line no-unused-vars
	ClickedOutsideMenu,
	// eslint-disable-next-line no-unused-vars
	EscapeKeyPressed,
	// eslint-disable-next-line no-unused-vars
	MenuButtonClicked,
	// eslint-disable-next-line no-unused-vars
	CloseMenu,
}

interface BaseAction {
	type: Actions;
}

interface EscapeKeyPressedAction extends BaseAction {
	type: Actions.EscapeKeyPressed;
	currentIndex: number | null;
}

interface ClickedOutsideMenuAction extends BaseAction {
	type: Actions.ClickedOutsideMenu;
}

interface MenuButtonClickedAction extends BaseAction {
	type: Actions.MenuButtonClicked;
	clickedIndex: number;
}

interface CloseMenuAction extends BaseAction {
	type: Actions.CloseMenu;
}

export type Action =
	| EscapeKeyPressedAction
	| ClickedOutsideMenuAction
	| MenuButtonClickedAction
	| CloseMenuAction;

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case Actions.EscapeKeyPressed:
			return {
				...state,
				focusIndexState: action.currentIndex,
				openIndexState: null,
			};
		case Actions.ClickedOutsideMenu:
			return {
				...state,
				openIndexState: null,
				focusIndexState: state.openIndexState,
			};
		case Actions.MenuButtonClicked:
			if (
				state.openIndexState &&
				state.openIndexState === action.clickedIndex
			) {
				return {
					...state,
					openIndexState: null,
				};
			}
			return {
				...state,
				openIndexState: action.clickedIndex,
			};
		case Actions.CloseMenu:
			return {
				...state,
				openIndexState: null,
			};
		default:
			return state;
	}
}

export const StateDefaults: DefaultableState = {
	openIndexState: null,
	focusIndexState: null,
};
