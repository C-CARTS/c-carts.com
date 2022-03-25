import { News } from '@c-carts/cms';

import styled from 'styled-components';
import { ThemeProps } from '../types/theme';

const NewsContainer = styled.section`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
`;

const Heading = styled.h1`
	font-size: 1.35rem;
`;

const SubHeading = styled.h2`
	font-size: 1.1rem;
`;

interface Props {
	news: News[];
}

export default function LatestNews({ news }: Props) {
	console.log('NEWS COMPONENT IS REACHED');
	return (
		<NewsContainer>
			{news.map((nz) => (
				<div key={nz._id}>
					<Heading>{nz.headline}</Heading>
					<SubHeading>{nz.dateTime}</SubHeading>
				</div>
			))}
		</NewsContainer>
	);
}
