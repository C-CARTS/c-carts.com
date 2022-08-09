import { useState, useEffect } from 'react';
import isServer from '../helpers/isServer';

interface Prop {
	query: string;
}

export default function useMediaQuery({ query }: Prop) {
	const [matches, setMatches] = useState(false);
	const onServerSide = isServer();

	useEffect(() => {
		const media = window.matchMedia(query);
		if (!onServerSide && media.matches !== matches) {
			setMatches(media.matches);
		}

		const listener = () => setMatches(media.matches);
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [matches, query, onServerSide]);

	return matches;
}

/// TO-DO consult Ryan to resolve hydration error
