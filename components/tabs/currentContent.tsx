import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import assertUnreachable from '../../helpers/assertUnreachable';
import urlFor from '../../sanity/urlFor';
import { currentSubTabState, SubTab } from '../../state/subTabState';
import { currentRouteSelector } from '../../state/tabState';
import getPdfUrl from '../../utils/getPdfUrl';
import MapsTab from './mapTab';
import Tables from './tables';

export default function CurrentContent() {
	const route = useRecoilValue(currentRouteSelector);
	const subTab = useRecoilValue(currentSubTabState);

	useEffect(() => {
		if (subTab === SubTab.Download && route) {
			const { routePdfs } = route;
			const pdfUrl = getPdfUrl(routePdfs);
			window.location.href = pdfUrl;
		}
	}, [route, subTab]);

	if (route === null) {
		return null;
	}

	const {
		content: { code },
		images
	} = route;

	switch (subTab) {
		case SubTab.Schedule:
			return <Tables code={code} />;
		case SubTab.Map:
			return <MapsTab mapUrl={urlFor(images).url()} />;
		case SubTab.Download:
			return null;
		default:
			assertUnreachable(subTab);
	}
}
