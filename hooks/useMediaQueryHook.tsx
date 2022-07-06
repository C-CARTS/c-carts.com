import { useEffect, useState } from 'react';
import isServer from '../helpers/isServer';

interface Prop {
	query: string;
}
/**
 * It returns a boolean value that is true if the media query matches the current viewport.
 * @param {Prop}  - query: A media query string.
 * @returns The `useMediaQuery` hook returns a boolean value.
 */

export default function useMediaQuery({ query }: Prop) {
	const onServerSide = isServer();
	const mediaMatch = onServerSide ? { matches: false, addEventListener: () => {}, removeEventListener: () => {} } : window.matchMedia(query); // return a MediaQueryList object
	const [breakPoints, setBreakpoints] = useState(mediaMatch.matches); // save returned state from above line

	const [render, setRender] = useState(false);

	useEffect(() => {
		setRender(true);
	}, []);

	useEffect(() => {
		/**
		 * `const handler: EventListenerOrEventListenerObject = (e: any) => setBreakpoints(e.matches);`
		 *
		 * The above function is a React hook that listens for changes to the mediaMatch object and then
		 * updates the breakpoints state
		 * @param {any} e - any - The event object.
		 */

		const handler: EventListenerOrEventListenerObject = (e: any) => setBreakpoints(e.matches);
		mediaMatch.addEventListener('change', handler);

		return () => mediaMatch.removeEventListener('change', handler);
	});

	if (render) {
		return breakPoints;
	}
	return false;
}

/// TO-DO consult Ryan if this is optimal way to resolve hydration error
