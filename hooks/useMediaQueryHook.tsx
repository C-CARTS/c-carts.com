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
	console.warn({ onServerSide });
	const mediaMatch = onServerSide ? { matches: false, addEventListener: () => {}, removeEventListener: () => {} } : window.matchMedia(query); // return a MediaQueryList object
	const [breakPoints, setBreakpoints] = useState(mediaMatch.matches); // save returned state from above line

	useEffect(() => {
		/**
		 * It adds an event listener to the mediaMatch object.
		 * @param {any} e - The event object that was passed to the handler.
		 */
		const handler = (e: any) => setBreakpoints(e.matches);
		mediaMatch.addEventListener('change', handler);
		return () => mediaMatch.removeEventListener('change', handler);
	});
	return breakPoints;
}
