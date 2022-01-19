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
`;
interface Props {
	nav: MainNavItem[];
}

export default function MainNav({ nav }: Props) {
	const [openIndex, setOpenIndex] = useRecoilState(openIndexState);
	const setFocusIndex = useSetRecoilState(focusIndexState);

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
		throw new Error('Nav is undefined');
	}

	return (
		<Nav>
			{nav.map((item, index) => (
				<NavSection key={item._id} item={item} index={index} />
			))}
		</Nav>
	);
}
