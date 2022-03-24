import { Page } from '@c-carts/cms';
import styled from 'styled-components';
import PortableText from '../sanity/portableText';

import { ThemeProps } from '../types/theme';

const Heading = styled.h1`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
	font-size: 1.35rem;
`;

type Props = {
	news: Page;
};

export default function News({ news }: Props) {
	const { content } = news;

	return (
		<div>
			{content &&
				content.map((cnt) => (
					<div key={cnt._key}>
						<Heading>{cnt.newsHeading}</Heading>
						<h2>{cnt.dateTime}</h2>
						<PortableText blocks={cnt.content} />
					</div>
				))}
		</div>
	);
}
