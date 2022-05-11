import { atom } from 'recoil';

const subTabAtom = atom<string>({
	key: 'subTabAtom',
	default: ''
});

export default subTabAtom;
