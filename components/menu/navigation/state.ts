import { atom, selectorFamily } from 'recoil';

export const openIndexState = atom<number | null>({
	key: 'openIndexState',
	default: null
});

export const focusIndexState = atom<number | null>({
	key: 'focusIndexState',
	default: null
});

export const isOpenSelector = selectorFamily<boolean, number>({
	key: 'isOpenSelector',
	get:
		(index) =>
		({ get }) => {
			const current = get(openIndexState);
			return index === current;
		}
});
