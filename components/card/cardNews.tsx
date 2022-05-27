import { useRecoilValue } from 'recoil';
import { newsSelector } from '../../state/newsCardState';
import PortableTxt from '../../sanity/portableText';
import getDate from '../../utils/dateTime';

export default function CardNews() {
	const selectedNews = useRecoilValue(newsSelector);
	if (selectedNews === null) {
		return <div>The selected item does not exist</div>;
	}
	const { headline, content, dateTime } = selectedNews;

	return (
		<div>
			<h2>{headline}</h2>
			<h3>{getDate(dateTime)}</h3>
			<div>
				<PortableTxt blocks={content} />
			</div>
		</div>
	);
}
