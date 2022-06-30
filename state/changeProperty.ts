import { atom, selector } from 'recoil';
import useMediaQuery from '../hooks/useMediaQueryHook';

export const titleState = atom<string>({
	key: 'titleStateKey',
	default: ''
});
