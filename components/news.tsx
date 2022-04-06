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

/**
 * It takes in a news array and returns a news container with the news inside of it.
 * @param {Props}  - news: An array of News objects.
 * @returns A list of news headlines.
 */
interface Props {
	news: News[];
}

export default function LatestNews({ news }: Props) {
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
