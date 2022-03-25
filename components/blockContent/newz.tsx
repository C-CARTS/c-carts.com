import { NewsSection } from '@c-carts/cms';
import useNewz from '../../data-hooks/useNewz';
import News from './news';

interface Props {
	block: NewsSection;
}

export default function NewsComponent({ block: { count } }: Props) {
	const newsUpdates = useNewz();

	if (newsUpdates.length === 0) {
		return (
			<p className="news unavailable">
				<strong>There are currently no news updates available</strong>
			</p>
		);
	}

	const filtered = count === 0 ? newsUpdates : newsUpdates.slice(0, count);

	return (
		<>
			<h2>News</h2>
			{filtered.map((j) => (
				<News nz={j} key={j._id} />
			))}
		</>
	);
}
