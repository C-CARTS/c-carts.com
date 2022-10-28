import { Routes } from '@c-carts/cms';
import { atom, selector, selectorFamily } from 'recoil';

export const tabFocusState = atom<number>({
	key: 'tabFocusState',
	default: 0
});

/**
 * It is the atom to track active index of Tabs, and the default value is 0.
 */
export const currentTabState = atom<number>({
	key: 'currentTabState',
	default: 0
});

export const loadedRoutesState = atom<Routes[]>({
	key: 'loadedRoutesState',
	default: []
});

export const currentRouteSelector = selector<Routes | null>({
	key: 'currentRouteSelector',
	get: ({ get }) => {
		const loadedRoutes = get(loadedRoutesState);
		const currentTab = get(currentTabState);

		if (loadedRoutes === null) {
			return null;
		}
		if (loadedRoutes.length === 1) {
			return loadedRoutes[0];
		}
		return loadedRoutes[currentTab];
	}
});

export const tabLabelCountSelector = selector<number>({
	key: 'tabLabelCountSelector',
	get: ({ get }) => {
		const loadedRoutes = get(loadedRoutesState);
		return loadedRoutes.length;
	}
});

export const routeFamilySelector = selectorFamily<Routes, number>({
	key: 'routeFamilySelector',
	get:
		(index: number) =>
		({ get }) => {
			const loadedRoutes = get(loadedRoutesState);
			return loadedRoutes[index];
		}
});
