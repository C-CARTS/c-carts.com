import { FC, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MainNavItem } from '../../data-hooks/useMainNav';
import NavSection from './navSection';
import { focusIndexState, openIndexState } from './state';

interface Props {
	nav: MainNavItem[];
}

const MainNav: FC<Props> = ({ nav }: Props) => {
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
		<nav>
			{nav.map((item, index) => (
				<NavSection key={item._id} item={item} index={index} />
			))}
		</nav>
	);
};

export default MainNav;
