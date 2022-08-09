import { SiteConfig } from '@c-carts/cms';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import urlFor from '../../sanity/urlFor';
import titleState, { breakPointState } from '../../state/changeProperty';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';
import Footer from '../footer/footer';
import Menu from '../menu/menu';
import HeadContent from './headContent';
import SkipLink from './skipLink';

interface Props {
	title: string;
	description?: string | undefined;
	children: ReactElement | ReactElement[];
	mainNav: MainNavItem[];
	siteConfig: SiteConfig;
}

const ContentWrap = styled.div`
	display: flex;
	flex-flow: column nowrap;
	margin: 0 auto;
	height: 100%;
`;

const changeValues = (val: string, bannerImg: string | null) => {
	switch (val) {
		case 'Homepage':
			return `height: 400px;
			background-image:url(${bannerImg});
			background-repeat:no-repeat;
			background-size:cover;
			background-attachment: fixed;
			padding:0px;
		`;
		default:
			return `background-color: none;
			`;
	}
};

interface Prop {
	home: string;
	breakpt: boolean;
	banner: string | null;
}

const Wrapper = styled.div<Prop>`
	width: 100%;
	padding-top: clamp(1rem, 3vh, 2rem);
	padding-right: ${({ breakpt }) => (breakpt ? '0px' : `clamp(1rem, 5vw, 3rem)`)};
	padding-bottom: clamp(2rem, 5vh, 5rem);
	padding-left: ${({ breakpt }) => (breakpt ? '0px' : `clamp(1rem, 5vw, 3rem)`)};
	margin-left: 0;

	${({ home, banner }) => changeValues(home, banner)}

	@media (max-width:${mediaQueryMaxWidths.genericpage}px) {
		height: 100%;
	}
`;

const MainWrap = styled.div`
	padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} ${theme.sizes.contentPaddingSides} ${theme.sizes.contentPaddingBottom}`};
	max-width: ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
`;

const Main = styled.main`
	max-width: ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
`;

const MenuWrapper = styled.div`
	width: 100%;
`;

export default function GenericPage({ title, description, children, mainNav, siteConfig: { shortTitle, address, phone, logo, bannerImage } }: Props) {
	const pageTitle = useRecoilValue(titleState);
	const breakpoint = useRecoilValue(breakPointState);
	const bannerImg = urlFor(bannerImage.asset._ref).toString();
	return (
		<>
			<SkipLink />
			<ContentWrap>
				<HeadContent title={title} description={description} />
				<Wrapper banner={bannerImg} breakpt={breakpoint} home={pageTitle}>
					<MenuWrapper className="menuWrapper">
						<Menu nav={mainNav} shortTitle={shortTitle} />
					</MenuWrapper>
				</Wrapper>
				<MainWrap id="main-content">
					<Main>
						{title && <h1> {title}</h1>}
						{children}
					</Main>
				</MainWrap>
				<Footer address={address} phone={phone} logo={logo} />
			</ContentWrap>
		</>
	);
}

GenericPage.defaultProps = {
	description: undefined
};
