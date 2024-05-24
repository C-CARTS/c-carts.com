"use client";

import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import NavItem from "../../@types/navItem";
import useOnClickOutside from "../../hooks/useOnClickOutside";
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
	const menuRef = useRef<HTMLLIElement | null>(null);

	// close menu on click outside
	useOnClickOutside(menuRef, () => {
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
		[styles.closed]: !isOpen,
	});

	return (
		<li className={styles.navSection} ref={menuRef}>
			<button
				className={buttonClass}
				aria-controls={id}
				onClick={buttonClick}
				ref={buttonRef}
				aria-haspopup="true"
				aria-expanded={isOpen}
				aria-label={`${title} menu`}
				type="button"
			>
				<DownArrow />
				{title}
			</button>
			<ul
				className={ulClass}
				aria-label={`${title} sub menu`}
				aria-hidden={!isOpen}
				id={id}
			>
				{children.map(({ _id, title, slug: childSlug }, i) => (
					<li key={_id} className={styles.li}>
						<SubPage
							title={title}
							slug={childSlug}
							last={i === children.length - 1}
						/>
					</li>
				))}
			</ul>
		</li>
	);
}
