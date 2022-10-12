import { atom } from 'recoil';

const mobileMenuOpenState = atom<boolean>({
	key: 'mobileMenuOpenState',
	default: false
});

export default mobileMenuOpenState;
