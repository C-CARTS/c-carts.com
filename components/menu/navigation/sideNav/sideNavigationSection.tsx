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
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.25}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
	margin-bottom: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.21);
	width: max-content;
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
			<SideNavButton type="button" name={title} onClick={buttonClick} ref={buttonRef} className={isOpen ? 'open' : 'closed'}>
				{!isOpen ? <MdArrowRight /> : <MdArrowDropDown />}
				{title}
			</SideNavButton>
			{isOpen && (
				<ul>
					{subPages.map((sp, i) => (
						<li key={sp._id}>
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</ul>
			)}
		</>
	);
}
