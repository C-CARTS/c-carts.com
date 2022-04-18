import { useCallback, useEffect, useRef } from 'react';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import { focusedIndexSideNav, isSideMenuOpen, openSideMenuIndex } from '../../../../state/sideNavState';
import { ThemeProps } from '../../../../types/theme';
import SubPage from '../subPage';

const SideNavButton = styled.button`
	-webkit-appearance: none;
	border: none;
	background: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.25}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
	margin-bottom: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.21);
	width: min(100%, ${(props) => props.theme.breakpoints.largeDesktop});
	border-bottom: 0.25rem solid transparent;
	transition: all 0.2s ease-out;
	white-space: nowrap;

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

const List = styled.ul`
	text-decoration: none;
	list-style: none;

	li {
		padding-right: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides};
		text-align: center;
	}
`;

interface Props {
	index: number;
	item: MainNavItem;
}

export default function SideNavigationSection({ item: { title, slug, subPages }, index }: Props) {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const setOpenIndex = useSetRecoilState(openSideMenuIndex);
	const [focusMenuIndex, setMenuIndexFocus] = useRecoilState(focusedIndexSideNav);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const isOpen = useRecoilValue(isSideMenuOpen(index));

	// close menu on click if outside menu contex
	useOnClickOutside(menuRef, () => {
		if (isOpen) {
			setOpenIndex(null);
		}
	});

	useEffect(() => {
		if (focusMenuIndex === index && buttonRef.current) {
			buttonRef.current.focus();
			setMenuIndexFocus(null);
		}
	}, [focusMenuIndex, setMenuIndexFocus, index]);

	const buttonClick = useCallback(() => {
		if (isOpen) {
			setOpenIndex(null);
		} else {
			setOpenIndex(index);
		}
	}, [index, isOpen, setOpenIndex]);

	return (
		<>
			<SideNavButton aria-expanded={isOpen} type="button" name={title} onClick={buttonClick} ref={buttonRef} className={isOpen ? 'open' : 'closed'}>
				{!isOpen ? <MdArrowRight /> : <MdArrowDropDown />}
				{title}
			</SideNavButton>
			{isOpen && (
				<List>
					{subPages.map((sp, i) => (
						<li key={sp._id}>
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</List>
			)}
		</>
	);
}
