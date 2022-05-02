import { atom, selector } from 'recoil';

export const activeIndexAtom = atom<number>({
	key: 'activeIndex',
	default: 0
});

export const labelArrayAtom = atom({
	key: 'labelArrayAtom',
	default: []
});

export const activeLabelSelector = selector({
	key: 'activeLabelSelector',
	get: ({ get }) => {
		const activeIndex = get(activeIndexAtom);
		const activeLabel = get(labelArrayAtom);
		return activeLabel[activeIndex];
	}
});
