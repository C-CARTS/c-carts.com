import { useEffect, useState } from 'react';

interface Prop {
	query: string;
}
/**
 * It returns a boolean value that is true if the media query matches the current viewport.
 * @param {Prop}  - query: A media query string.
 * @returns The `useMediaQuery` hook returns a boolean value.
 */

export default function useMediaQuery({ query }: Prop) {
	const mediaMatch = window.matchMedia(query);
	const [breakPoints, setBreakpoints] = useState(mediaMatch.matches);

	useEffect(() => {
		const handler = (e: any) => setBreakpoints(e.matches);
		mediaMatch.addEventListener('change', handler);
		return () => mediaMatch.removeEventListener('change', handler);
	});
	return breakPoints;
}
