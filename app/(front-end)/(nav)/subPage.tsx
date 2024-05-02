"use client";

import { KeyboardEvent, useCallback, useContext, useEffect } from "react";
import { Slug } from "sanity";
import { AppContext } from "./mainNavClient";
import { Actions } from "./menuReducer";
import styles from "./subPage.module.css";

interface Props {
	title: string;
	last: boolean;
	parentSlug: Slug;
	slug: Slug;
}

export default function SubPage({ title, slug, parentSlug, last }: Props) {
	const { dispatch } = useContext(AppContext);

	useEffect(() => {
		console.log("sp", { slug, parentSlug });
	}, [slug, parentSlug]);

	const onKeyDown = useCallback(
		({ key, shiftKey }: KeyboardEvent<HTMLAnchorElement>) => {
			// close menu if we tab off the last item.
			if (last && key === "Tab" && !shiftKey) {
				dispatch({ type: Actions.CloseMenu });
			}
		},
		[dispatch, last],
	);

	if (slug && parentSlug) {
		const { current: parentSlugVal } = parentSlug;
		const { current: slugVal } = slug;
		return (
			<a
				aria-current="page"
				href={`/${parentSlugVal}/${slugVal}`}
				onKeyDown={onKeyDown}
				className={styles.a}
			>
				<span>{title}</span>
			</a>
		);
	}
	return <span>AHHHHHHH</span>;
}
