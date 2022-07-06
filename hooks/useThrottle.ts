import { useEffect, useRef, useState } from 'react';
import isServer from '../helpers/isServer';

export default function useThrottle<T>(value: T, interval: number): T {
	const [throttledValue, setThrottledValue] = useState<T>(value);
	const lastExecuted = useRef<number>(Date.now());

	useEffect(() => {
		if (!isServer()) {
			if (Date.now() >= lastExecuted.current + interval) {
				lastExecuted.current = Date.now();
				setThrottledValue(value);
			} else {
				const timerId = setTimeout(() => {
					lastExecuted.current = Date.now();
					setThrottledValue(value);
				}, interval);

				return () => clearTimeout(timerId);
			}
		}
		return () => {};
	}, [value, interval]);

	return throttledValue;
}
