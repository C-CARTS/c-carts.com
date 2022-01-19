import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const SkipLinkAnchor = styled.a`
	position: fixed;
	width: 13rem;
	left: -13.2rem;
	top: 1rem;
	display: block;
	transition: left 0.2s ease-out;
	z-index: 1100;
	background: ${({ theme }: ThemeProps) => theme.colors.primary.color};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.contrastColor};
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	box-shadow: 0.1rem 0.1rem 0 0.015rem ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}88;

	&:focus,
	&:focus-visible {
		left: 0;
		transition: left 0.2s ease-in;
		outline-color: transparent;
		outline: none;
	}
`;

const SkipLinkText = styled.span`
	display: block;
	padding: 0.5rem 1.25rem;
	text-align: center;
`;

export default function SkipLink() {
	return (
		<SkipLinkAnchor href="#main-content">
			<SkipLinkText>Skip to main content</SkipLinkText>
		</SkipLinkAnchor>
	);
}
