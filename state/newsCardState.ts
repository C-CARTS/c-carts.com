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

export const newsSelector = selector<News | undefined>({
	key: 'newsSelector',
	get: ({ get }) => {
		const newsArray = get(newsObjectState);
		const slug = get(newsSlugState);
		const result = newsArray.filter((news) => news.slug.current === slug);
		return result[0];
	}
});
