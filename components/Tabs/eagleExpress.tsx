import { Routes } from '@c-carts/cms';
import SubTab from './subTab';
import Tab from './tab';
import Tabs from './tabs';

interface Props {
	eagle: Routes[];
}

export default function EagleExpress({ eagle }: Props) {
	return (
		<Tabs activeIndex={0}>
			{eagle.map((j: Routes) => (
				<Tab key={j._id} label={j.slug.current}>
					<SubTab content={j.content} pdf={j.routePdfs} map={j.images} key={j._id} />
				</Tab>
			))}
		</Tabs>
	);
}
