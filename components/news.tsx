import useNews from '../data-hooks/useNews';

// interface Content {
// 	content: [{ dateTime: string; newsHeading: string; content: [{ children: [{}] }] }];
// }

export default function News() {
	// const result: Content = useNews();

	return <>News</>;
}

News.dataHooks = [useNews];
