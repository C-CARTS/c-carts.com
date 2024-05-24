"use client";

import { Context, Dispatch, createContext, useEffect, useReducer } from "react";
import NavItem from "../../@types/navItem";
import styles from "./mainNavClient.module.css";
import { Action, Actions, State, StateDefaults, reducer } from "./menuReducer";
import NavSection from "./navSection";

interface Props {
	navItems: NavItem[];
	shortTitle: string;
}

export interface AppContextType {
	dispatch: Dispatch<Action>;
	state: State;
}

export const AppContext: Context<AppContextType> =
	createContext<AppContextType>({
		dispatch: () => {},
		state: { ...StateDefaults },
	});

export default function MainNavClient({ navItems, shortTitle }: Props) {
	const [state, dispatch] = useReducer(reducer, { ...StateDefaults });
	const context: AppContextType = { state, dispatch };
	const { openIndexState } = state;
	/**
	 * When the escape key is pressed, if the openIndex is not null, set the focusIndex to the openIndex
	 * and set the openIndex to null
	 * @param {KeyboardEvent}  - The function to be called when the key is pressed.
	 */
	/* This is a React Hook that is used to call a function when a specific event occurs. In this case,
	the event is the keydown event. The function is called when the keydown event occurs. The function
	is passed a parameter called `key` that contains the key that was pressed. If the key that was
	pressed is the escape key and the openIndex is not null, then set the focusIndex to the openIndex
	and set the openIndex to null. */
	useEffect(() => {
		function escapeFunction({ key }: KeyboardEvent) {
			if (key === "Escape" && openIndexState !== null) {
				dispatch({
					type: Actions.EscapeKeyPressed,
					currentIndex: openIndexState,
				});
			}
		}

		document.addEventListener("keydown", escapeFunction, false);

		return () => {
			document.removeEventListener("keydown", escapeFunction, false);
		};
	}, [openIndexState]);

	return (
		<AppContext.Provider value={context}>
			<nav aria-label={`${shortTitle} Menu`} id="main-nav-container">
				<div role="list" className={styles.nav}>
					{navItems.map((item, index) => (
						<NavSection key={item._id} navItem={item} index={index} />
					))}
				</div>
			</nav>
		</AppContext.Provider>
	);
}
