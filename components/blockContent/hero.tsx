import { FC } from 'react';
import { Hero } from '../../sanity/schema';

interface Props {
	block: Hero;
}

const HeroComponent: FC<Props> = () => {
	return <p>Hero</p>;
};

export default HeroComponent;
