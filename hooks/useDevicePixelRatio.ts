import { useEffect, useState } from "react";

export interface DevicePixelRatioOptions {
	/**
	 * Default DPR to use if browser does not support the `devicePixelRatio`
	 * property, or when rendering on server
	 *
	 * @defaultValue `1`
	 */
	defaultDpr?: number;

	/**
	 * Whether or not to round the number down to the closest integer
	 *
	 * @defaultValue `true`
	 */
	round?: boolean;

	/**
	 * Maximum DPR to return (set to `2` to only generate 1 and 2)
	 *
	 * @defaultValue `3`
	 */
	maxDpr?: number;
}

/**
 * Get the device pixel ratio, potentially rounded and capped.
 * Will emit new values if it changes.
 *
 * @param options
 * @returns The current device pixel ratio, or the default if none can be resolved
 */
export function useDevicePixelRatio(options?: DevicePixelRatioOptions) {
	const dpr = getDevicePixelRatio(options);
	const [currentDpr, setCurrentDpr] = useState(dpr);
	const { defaultDpr, maxDpr, round } = options || {};

	useEffect(() => {
		const canListen = typeof window !== "undefined" && "matchMedia" in window;
		if (!canListen) {
			return;
		}

		const updateDpr = () =>
			setCurrentDpr(getDevicePixelRatio({ defaultDpr, maxDpr, round }));
		const mediaMatcher = window.matchMedia(
			`screen and (resolution: ${currentDpr}dppx)`,
		);

		// Safari 13.1 does not have `addEventListener`, but does have `addListener`
		if (mediaMatcher.addEventListener) {
			mediaMatcher.addEventListener("change", updateDpr);
		} else {
			mediaMatcher.addListener(updateDpr);
		}

		return () => {
			if (mediaMatcher.removeEventListener) {
				mediaMatcher.removeEventListener("change", updateDpr);
			} else {
				mediaMatcher.removeListener(updateDpr);
			}
		};
	}, [currentDpr, defaultDpr, maxDpr, round]);

	return currentDpr;
}

/**
 * Returns the current device pixel ratio (DPR) given the passed options
 *
 * @param options
 * @returns current device pixel ratio
 */
export function getDevicePixelRatio(options?: DevicePixelRatioOptions): number {
	const { defaultDpr = 1, maxDpr = 3, round = true } = options || {};
	const hasDprProp =
		typeof window !== "undefined" &&
		typeof window.devicePixelRatio === "number";
	const dpr = hasDprProp ? window.devicePixelRatio : defaultDpr;
	const rounded = Math.min(Math.max(1, round ? Math.floor(dpr) : dpr), maxDpr);
	return rounded;
}
