import { atom, selectorFamily } from 'recoil';

export const openSideMenuIndex = atom<number | null>({
	key: 'openSideMenuIndex',
	default: null
});

export const focusedIndexSideNav = atom<number | null>({
	key: 'focusedIndexSideNav',
	default: null
});

export const isSideMenuOpen = selectorFamily<boolean, number>({
	key: 'isSideMenuOpen',
	get:
		(index) =>
		({ get }) => {
			const current = get(openSideMenuIndex);
			return index === current;
		}
});
