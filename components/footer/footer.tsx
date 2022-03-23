import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';
import BasicSanityImage from '../generic/basicSanityImage';

interface Props {
	address: string;
	phone: string;
	logo: SanityImageSource | undefined;
}

const FooterElement = styled.footer`
	background: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}44;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
`;

const FooterContent = styled.div`
	padding: ${({ theme }: ThemeProps) => `5rem ${theme.sizes.contentPaddingSides} `};
	width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 400px;
	grid-template-rows: 1fr;
	grid-template-areas: 'contact logo';
	align-items: center;
	grid-gap: 1rem;

	@media (max-width: ${({ theme }: ThemeProps) => theme.breakpoints.mobile.maxWidth}px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		grid-template-areas: 'contact' 'logo';
		grid-gap: 3rem;
	}
`;

const Contact = styled.div`
	grid-area: contact;

	p {
		margin: 0;
	}

	p,
	a {
		color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.text};

		a:hover,
		&:focus-visible {
			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.color};
		}

		&:focus-visible {
			outline-color: transparent;
			background: ${({ theme }: ThemeProps) => theme.colors.primary.subtle};
			outline: 0;
			border: 0;
		}
	}
`;
const Logo = styled.div`
	grid-area: logo;
	width: 100%;
	max-width: 400px;
`;

export default function Footer({ address, phone, logo }: Props) {
	return (
		<FooterElement>
			<FooterContent>
				<Contact>
					<p className="address">
						{address.split('\n').map((line, i) => (
							<span key={`${line}`}>
								{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
								{i === 0 ? <strong>{line}</strong> : <>{line}</>}
								<br />
							</span>
						))}
					</p>
					<p className="phone">
						<a href={`tel:${phone}`}>{phone}</a>
					</p>
				</Contact>
				{logo && (
					<Logo>
						<BasicSanityImage src={logo} omitAlt width={400} aspectratio="384/151" layout="responsive" />
					</Logo>
				)}
			</FooterContent>
		</FooterElement>
	);
}
