/* eslint-disable no-underscore-dangle */
import { News } from '@c-carts/cms';

import Card from '../card/card';

interface Props {
	news: News;
}

export default function NewsComponent({ news }: Props) {
	return <Card news={news} />;
}
