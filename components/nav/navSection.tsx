"use client";

import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import NavItem from "../../@types/navItem";
import DownArrow from "./downArrow";
import { AppContext } from "./mainNavClient";
import { Actions } from "./menuReducer";
import styles from "./navSection.module.css";
import SubPage from "./subPage";

interface Props {
	navItem: NavItem;
	index: number;
}

export default function NavSection({
	navItem: { title, children, _id: id },
	index,
}: Props) {
	const {
		state: { openIndexState, focusIndexState },
		dispatch,
	} = useContext(AppContext);
	const isOpen = useMemo(
		() => openIndexState === index,
		[openIndexState, index],
	);

	useEffect(() => {
		if (focusIndexState === index) {
			buttonRef.current?.focus();
		}
	}, [focusIndexState, index]);

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);

	// close menu on click outside
	useOnClickOutside(menuRef, () => {
		console.log("foo");
		if (isOpen) {
			dispatch({ type: Actions.ClickedOutsideMenu });
		}
	});

	const buttonClick = useCallback(() => {
		dispatch({ type: Actions.MenuButtonClicked, clickedIndex: index });
	}, [dispatch, index]);

	const buttonClass = clsx({
		[styles.navButton]: true,
		[styles.open]: isOpen,
	});

	const ulClass = clsx({
		[styles.ul]: true,
		[styles.open]: isOpen,
	});

	return (
		<div className={styles.navSection}>
			<button
				className={buttonClass}
				aria-controls={id}
				onClick={buttonClick}
				ref={buttonRef}
				aria-haspopup="true"
				aria-expanded={isOpen}
				aria-label={`${title} menu`}
			>
				<DownArrow />
				{title}
			</button>
			<ul className={ulClass} aria-label={`${title} sub menu`} id={id}>
				{children.map(({ _id, title, slug: childSlug }, i) => (
					<li key={_id} role="none" className={styles.li}>
						<SubPage
							title={title}
							slug={childSlug}
							last={i === children.length - 1}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
