import { atom } from 'recoil';

export enum SubTab {
	Schedule = 0,
	Map = 1,
	Download = 2
}

export const currentSubTabState = atom<SubTab>({
	key: 'currentSubTabState',
	default: SubTab.Schedule
});

export const focusSubTabState = atom<SubTab | null>({
	key: 'focusSubTabState',
	default: null
});
