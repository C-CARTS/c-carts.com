/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import SubPage from './subPage';

interface Props {
	item: MainNavItem;
}

const NavSection: FC<Props> = ({ item: { title, subPages } }: Props) => {
	return (
		<>
			<button type="button">{title}</button>
			<ul>
				{subPages.map((sp) => (
					<SubPage key={sp._id} page={sp} />
				))}
			</ul>
		</>
	);
};

export default NavSection;
