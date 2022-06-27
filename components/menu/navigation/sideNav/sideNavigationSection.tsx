import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import { ThemeProps } from '../../../../types/theme';
import SubPage from '../subPage';

const SideNavContainer = styled.div`
	-webkit-appearance: none;
	width: min(100%, ${(props) => props.theme.breakpoints.largeDesktop});
	width: 100vw;
	height: 100%;
	text-align: center;
	border: none;
	background: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.25}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
	margin-bottom: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.21);
	border-bottom: 0.25rem solid transparent;
	transition: all 0.2s ease-out;
	h2 {
		font-weight: 800;
	}
	li {
		font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.079rem);
		font-weight: 600;
	}
	&:focus-visible,
	&.open,
	&.open:hover {
		outline: transparent;
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		transition: all 0.2s ease-in;
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}

	&.open,
	&.open:hover {
		svg {
			color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
			transition: all 0.2s ease-in;
		}
	}

	&:hover {
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
	}

	svg {
		margin-right: 0.1rem;
		transition: all 0.2s ease-out;
	}
`;

const List = styled.ul`
	text-decoration: none;
	list-style: none;

	li {
		padding-right: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides};
		text-align: center;
	}
`;

interface Props {
	item: MainNavItem;
}

export default function SideNavigationSection({ item: { title, slug, subPages } }: Props) {
	return (
		<SideNavContainer>
			<h2 id="menuTitle">{title}</h2>
			{title && (
				<List aria-labelledby="menuTitle">
					{subPages.map((sp, i) => (
						<li key={sp._id}>
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</List>
			)}
		</SideNavContainer>
	);
}
