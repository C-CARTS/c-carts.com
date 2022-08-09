import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../../data-hooks/useMainNav';
import NavSection from './navSection';
import { focusIndexState, openIndexState } from './state';

const Nav = styled.nav`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	margin-left: auto;
`;
interface Props {
	nav: MainNavItem[];
}

export default function MainNav({ nav }: Props) {
	const [openIndex, setOpenIndex] = useRecoilState(openIndexState);
	const setFocusIndex = useSetRecoilState(focusIndexState);

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
			if (key === 'Escape' && openIndex) {
				setFocusIndex(openIndex);
				setOpenIndex(null);
			}
		}

		document.addEventListener('keydown', escapeFunction, false);

		return () => {
			document.removeEventListener('keydown', escapeFunction, false);
		};
	}, [openIndex, setOpenIndex, setFocusIndex]);

	if (nav === undefined) {
		throw new Error('Navigation is undefined');
	}

	return (
		<Nav aria-label="C-Carts Menu" id="main-nav-container">
			{nav.map((item, index) => (
				<NavSection key={item._id} item={item} index={index} />
			))}
		</Nav>
	);
}
