import { SiteConfig } from '@c-carts/cms';
import { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { SanityImageAsset, SanityImageCrop, SanityImageHotspot, SanityReference } from 'sanity-codegen';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { sanityImageUrl } from '../../helpers/sanityImageUrl';
import titleState from '../../state/changeProperty';
import { deviceScale } from '../../styles/theme';
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
	min-height: 100vh;
`;

interface WrapperProps {
	image: {
		_type: 'image';
		asset: SanityReference<SanityImageAsset>;
		crop?: SanityImageCrop;
		hotspot?: SanityImageHotspot;
	};
}

const Wrapper = styled.div<WrapperProps & ThemeProps>`
	width: 100%;
	// max-width: ${({ theme }) => theme.sizes.maxContentWidth}px;
	padding-top: clamp(1rem, 3vh, 2rem);
	padding-right: 0;
	padding-bottom: clamp(2rem, 5vh, 5rem);
	padding-left: 0;
	margin: 0 auto;
	background-color: none;
	height: 100%;

	@media screen and (max-width: 620px) {
		padding-right: clamp(1rem, 5vw, 3rem);
		padding-left: clamp(1rem, 5vw, 3rem);
	}
`;

const HomepageWrapper = styled(Wrapper)`
	padding: 0px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	// Full Width (4k Monitor)
	background-image: url('${({ image }) => sanityImageUrl({ image, width: 2500, height: 450, deviceScale: deviceScale.oneX })}');
	height: 450px;

	@media screen and (min-resolution: 1.5dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 2500, height: 450, deviceScale: deviceScale.onePointFiveX })}');
	}

	@media screen and (min-resolution: 2dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 2500, height: 450, deviceScale: deviceScale.twoX })}');
	}

	@media screen and (min-resolution: 3dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 2500, height: 450, deviceScale: deviceScale.threeX })}');
	}

	// Desktop Width (HD Monitor)
	@media screen and (max-width: ${({ theme }: ThemeProps) => theme.screensizes.desktop.maxWidth}px) {
		height: ${({ theme }: ThemeProps) => theme.screensizes.desktop.height}px;
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 1920, height: 400, deviceScale: deviceScale.oneX })}');
	}

	@media screen and (max-width: 1920px) and (min-resolution: 1.5dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 1920, height: 400, deviceScale: deviceScale.onePointFiveX })}');
	}

	@media screen and (max-width: 1920px) and (min-resolution: 2dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 1920, height: 400, deviceScale: deviceScale.twoX })}');
	}

	@media screen and (max-width: 1920px) and (min-resolution: 3dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 1920, height: 400, deviceScale: deviceScale.threeX })}');
	}

	// Small Screen Width
	@media screen and (max-width: ${({ theme }: ThemeProps) => theme.screensizes.smallScren.maxWidth}px) {
		height: ${({ theme }: ThemeProps) => theme.screensizes.smallScren.height}px;
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 900, height: 550, deviceScale: deviceScale.oneX })}');
	}

	@media screen and (max-width: 900px) and (min-resolution: 1.5dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 900, height: 550, deviceScale: deviceScale.onePointFiveX })}');
	}

	@media screen and (max-width: 900px) and (min-resolution: 2dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 900, height: 550, deviceScale: deviceScale.twoX })}');
	}

	@media screen and (max-width: 900px) and (min-resolution: 3dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 900, height: 550, deviceScale: deviceScale.threeX })}');
	}

	// Mobile
	@media screen and (max-width: ${({ theme }: ThemeProps) => theme.screensizes.mobile.maxWidth}px) {
		height: ${({ theme }: ThemeProps) => theme.screensizes.mobile.height}px;
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 768, height: 550, deviceScale: deviceScale.oneX })}');
	}

	@media screen and (max-width: 768px) and (min-resolution: 1.5dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 768, height: 550, deviceScale: deviceScale.onePointFiveX })}');
	}

	@media screen and (max-width: 768px) and (min-resolution: 2dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 768, height: 550, deviceScale: deviceScale.twoX })}');
	}

	@media screen and (max-width: 768px) and (min-resolution: 3dppx) {
		background-image: url('${({ image }) => sanityImageUrl({ image, width: 768, height: 550, deviceScale: deviceScale.threeX })}');
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
	flex: 1 1 auto;
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
	const isHomePage = useMemo(() => pageTitle === 'Homepage', [pageTitle]);
	const WrapperComponent = isHomePage ? HomepageWrapper : Wrapper;

	return (
		<>
			<SkipLink />
			<ContentWrap>
				<HeadContent title={title} description={description} />
				<WrapperComponent id="wrap" image={bannerImage}>
					<MenuWrapper className="menuWrapper">
						<Menu nav={mainNav} shortTitle={shortTitle} />
					</MenuWrapper>
				</WrapperComponent>
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
