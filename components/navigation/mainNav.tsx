import { FC } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import NavSection from './navSection';

interface Props {
	nav: MainNavItem[];
}

const MainNav: FC<Props> = ({ nav }: Props) => {
	if (nav === undefined) {
		return <p>undefined</p>;
	}

	return (
		<nav>
			{nav.map((i) => (
				<NavSection key={i._id} item={i} />
			))}
		</nav>
	);
};

export default MainNav;
