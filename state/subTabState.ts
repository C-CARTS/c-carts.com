import { atom } from 'recoil';

const subTabAtom = atom<string>({
	key: 'subTabAtom',
	default: ''
});

export const focusTabState = atom<number | null>({
	key: 'focusTabState',
	default: null
});

export default subTabAtom;
