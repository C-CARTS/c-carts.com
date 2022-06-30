import { atom } from 'recoil';

const titleState = atom<string>({
	key: 'titleStateKey',
	default: ''
});

export default titleState;

export const breakPointState = atom<boolean>({
	key: 'breakPointState',
	default: false
});
