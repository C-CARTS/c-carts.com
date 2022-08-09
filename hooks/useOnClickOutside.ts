import { RefObject, useEffect } from 'react';

export type ClickEvent = MouseEvent | TouchEvent;

// eslint-disable-next-line no-unused-vars
type HandlerFunction = (event: ClickEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: HandlerFunction): void {
	useEffect(() => {
		const listener = (event: ClickEvent) => {
			const element = ref?.current;

			// Do nothing if clicking ref's element or descendent elements
			if (!element || element.contains(event.target as Node)) {
				return;
			}

			handler(event);
		};

		// bind click and touch events
		document.addEventListener(`mousedown`, listener);
		document.addEventListener(`touchstart`, listener);

		// unbind when hook is unmounted
		return () => {
			document.removeEventListener(`mousedown`, listener);
			document.removeEventListener(`touchstart`, listener);
		};

		// Reload only if ref or handler changes
	}, [ref, handler]);
}

export default useOnClickOutside;
