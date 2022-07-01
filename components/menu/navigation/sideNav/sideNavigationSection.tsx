import { KeyboardEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import { ThemeProps } from '../../../../types/theme';
import SubPage from '../subPage';

const List = styled.ul`
	text-decoration: none;
	list-style: none;
	padding: 0;
	li {
		padding-left: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.41);
		font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.059rem);
		font-weight: 600;
	}
	li > a {
		color: ${({ theme }: ThemeProps) => theme.colors.primary.subtle};
	}

	li > a:focus-visible {
		background: none;
		border: 1px solid blue;
	}
`;

interface Props {
	item: MainNavItem;
}

export default function SideNavigationSection({ item: { title, slug, subPages } }: Props) {
	const keyPressEvent = useCallback<KeyboardEventHandler<HTMLLIElement>>((event) => {
		const escKey = event.key === 'Escape';
		if (escKey) {
			document.getElementById('sideNavButton')?.focus();
			const btn = document.getElementById('sideNavButton');
			if (btn !== null) {
				btn.ariaExpanded = 'false';
				btn?.click();
			}
		}
	}, []);
	return (
		<>
			<h2 id="menuTitle">{title}</h2>
			{title && (
				<List>
					{subPages.map((sp, i) => (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
						<li key={sp._id} onKeyDown={keyPressEvent}>
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</List>
			)}
		</>
	);
}
