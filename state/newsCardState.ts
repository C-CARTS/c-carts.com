import { News } from '@c-carts/cms';
import { atom, selector } from 'recoil';

export const newsObjectState = atom<News[]>({
	key: 'newsObjectState',
	default: []
});

export const newsSlugState = atom<string>({
	key: 'newsSlugState',
	default: ''
});

export const newsSelector = selector<News | null>({
	key: 'newsSelector',
	get: ({ get }) => {
		const newsArray = get(newsObjectState);
		const slug = get(newsSlugState);

		let result = null;
		newsArray.forEach((element) => {
			if (element.slug.current === slug) {
				result = element;
				return result;
			}
			return null;
		});

		return result;
	}
});
