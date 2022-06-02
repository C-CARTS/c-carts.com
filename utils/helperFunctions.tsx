import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { newsObjectState, newsSlugState } from '../state/newsCardState';

export async function processSnapshot(snapshot: any) {
	const persistetNewsData = await snapshot.getPromise(newsObjectState);
	const persisitSlugState = await snapshot.getPromise(newsSlugState);
	const val = typeof window === 'undefined';
	if (val) {
		console.warn('Running on server');
	} else {
		localStorage.setItem(
			'news_storage',
			JSON.stringify({
				news: persistetNewsData,
				slug: persisitSlugState
			})
		);
	}
}

export function usePersistStorage() {
	useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
		processSnapshot(snapshot);
	});
}

export function InitState(snapshot: any) {
	const val = typeof window === 'undefined';
	if (val) {
		console.warn('Running on server');
	} else {
		const data = localStorage.getItem('news_storage');
		if (!data) return;
		const { news: persistetNewsData, slug: persisitSlugState } = JSON.parse(data);

		snapshot.set(newsObjectState, persistetNewsData);
		snapshot.set(newsSlugState, persisitSlugState);
	}
}
