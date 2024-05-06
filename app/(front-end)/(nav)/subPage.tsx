"use client";

import { KeyboardEvent, useCallback, useContext } from "react";
import { Slug } from "sanity";
import { AppContext } from "./mainNavClient";
import { Actions } from "./menuReducer";
import styles from "./subPage.module.css";

interface Props {
	title: string;
	last: boolean;
	slug: Slug;
}

export default function SubPage({ title, slug, last }: Props) {
	const { dispatch } = useContext(AppContext);

	const onKeyDown = useCallback(
		({ key, shiftKey }: KeyboardEvent<HTMLAnchorElement>) => {
			// close menu if we tab off the last item.
			if (last && key === "Tab" && !shiftKey) {
				dispatch({ type: Actions.CloseMenu });
			}
		},
		[dispatch, last],
	);

	if (slug) {
		const { current: slugVal } = slug;
		return (
			<a
				aria-current="page"
				href={`/${slugVal}`}
				onKeyDown={onKeyDown}
				className={styles.a}
			>
				<span>{title}</span>
			</a>
		);
	}
	return <span>AHHHHHHH</span>;
}
