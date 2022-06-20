/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../../data-hooks/useMainNav';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ThemeProps } from '../../../types/theme';
import { focusIndexState, isOpenSelector, openIndexState } from './state';
import SubPage from './subPage';

const navButonHeight = '2rem';

const SectionWrap = styled.div`
	margin-left: 1rem;
	position: relative;

	&:first-of-type {
		margin-left: 0;
	}

	ul {
		position: absolute;
		top: ${navButonHeight};
		left: 0;
		display: flex;
		flex-flow: column nowrap;
		padding: 0.75rem 0;
		min-width: min(90vw, 12rem);
		background: ${({ theme }: ThemeProps) => theme.colors.primary.background};
		border: 0.05rem solid ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		//border-top: 0;
		list-style: none;

		box-shadow: 0.2rem 0.2rem 0 0.025rem ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}px;

		li {
			padding: 0.2rem 0;
		}

		a {
			display: block;
			padding: 0 0.25rem;
			color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
			text-decoration-color: transparent;
			width: 95%;

			&:hover {
				> span {
					text-decoration: underline;
					text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
					text-decoration-thickness: 0.22rem;
				}
			}

			&:focus-visible {
				outline-color: transparent;
				> span {
					text-decoration: underline;
					text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
					text-decoration-thickness: 0.22rem;
					background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
				}
			}
		}
	}
`;

const NavButton = styled.button`
	-webkit-appearance: none;
	border: none;
	background: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.35}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
	padding: 0.25rem 0.5rem 0.1rem 0.5rem;
	min-width: 5.5rem;
	height: ${navButonHeight};
	border-bottom: 0.25rem solid transparent;
	transition: all 0.2s ease-out;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	white-space: nowrap;
	justify-content: center;

	&:focus-visible,
	&.open,
	&.open:hover {
		outline: transparent;
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		transition: all 0.2s ease-in;
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}

	&.open,
	&.open:hover {
		svg {
			color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
			transition: all 0.2s ease-in;
		}
	}

	&:hover {
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
	}

	svg {
		margin-right: 0.1rem;
		transition: all 0.2s ease-out;
	}
`;

/* The above code is creating a navigation menu for the site. It is using the useRecoilState hook to
set the focusIndexState atom. This atom is used to set the focus on the button when the focusIndex
is set. */
interface Props {
	index: number;
	item: MainNavItem;
}

export default function NavSection({ item: { title, slug, subPages }, index }: Props) {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const setOpenIndex = useSetRecoilState(openIndexState);
	const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const isOpen = useRecoilValue(isOpenSelector(index));

	// close menu on click outside
	useOnClickOutside(menuRef, () => {
		if (isOpen) {
			setOpenIndex(null);
		}
	});

	// set focus if the focus index is set
	/* This is a useEffect hook that is used to set the focus on the button when the focusIndex is set. */
	useEffect(() => {
		if (focusIndex === index && buttonRef.current) {
			buttonRef.current.focus();
			setFocusIndex(null);
		}
	}, [focusIndex, setFocusIndex, index]);

	const buttonClick = useCallback(() => {
		if (isOpen) {
			setOpenIndex(null);
		} else {
			setOpenIndex(index);
		}
	}, [index, isOpen, setOpenIndex]);

	return (
		<SectionWrap ref={menuRef}>
			<NavButton
				type="button"
				onClick={buttonClick}
				ref={buttonRef}
				className={isOpen ? 'open' : 'closed'}
				aria-haspopup={isOpen}
				aria-label={`${title} menu`}
				aria-expanded={isOpen}
			>
				<MdArrowDropDown aria-hidden="true" />
				{title}
			</NavButton>
			{isOpen && (
				<ul role="menubar">
					{subPages.map((sp, i) => (
						<li key={sp._id} role="none">
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</ul>
			)}
		</SectionWrap>
	);
}
