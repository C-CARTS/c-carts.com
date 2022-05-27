import { getDataHooksProps } from 'next-data-hooks';
import CardNews from '../../../../components/card/cardNews';

import GenericPage from '../../../../components/generic/genericPage';
import useMainNav from '../../../../data-hooks/useMainNav';
import useSiteConfig from '../../../../data-hooks/useSiteConfig';

export default function CardNewsDisplay() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	return (
		<GenericPage title="News" siteConfig={siteConfig} mainNav={mainNav}>
			<CardNews />
		</GenericPage>
	);
}

CardNewsDisplay.dataHooks = [useSiteConfig, useMainNav];

export async function getServerSideProps(context: any) {
	const dataHookProps = await getDataHooksProps({
		context,
		dataHooks: CardNewsDisplay.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
}
