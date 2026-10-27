"use client";

import type { Slug } from "@c-carts/types";
import { usePathname } from "next/navigation";
import { type KeyboardEvent, useCallback, useContext } from "react";
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
	const pathname = usePathname();

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
		const href = slugVal === "/" ? "/" : `/${slugVal.replace(/^\/+|\/+$/g, "")}`;
		const currentPath = pathname.replace(/\/+$/, "") || "/";
		return (
			<a
				aria-current={currentPath === href ? "page" : undefined}
				href={href}
				onKeyDown={onKeyDown}
				className={styles.a}
			>
				<span>{title}</span>
			</a>
		);
	}
	return null;
}
