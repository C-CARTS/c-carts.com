import { Page } from '@c-carts/cms';
import Link from 'next/link';
import styled from 'styled-components';
import PortableText from '../sanity/portableText';
import { ThemeProps } from '../types/theme';

const NewsContainer = styled.div`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
`;

const Heading = styled.h1`
	font-size: 1.35rem;
`;

const SubHeading = styled.h2`
	font-size: 1.1rem;
`;

interface Props {
	news: Page;
}

export default function News({ news }: Props) {
	const { content } = news;

	return (
		<div>
			{content &&
				content.map((cnt) => (
					<Link key={cnt._key} href={`/http://localhost:3000/about-us/news-updates/${cnt.dateTime}`} passHref>
						<NewsContainer key={cnt._key}>
							<Heading>{cnt.newsHeading}</Heading>
							<SubHeading>{cnt.dateTime}</SubHeading>
							<PortableText block={cnt.content} />
						</NewsContainer>
					</Link>
				))}
		</div>
	);
}
