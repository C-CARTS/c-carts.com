export interface ThemePalette {
	color: string;
	subtle: string;
	contrastColor: string;
}

export interface PrimaryThemePalette extends ThemePalette {
	background: string;
	text: string;
	layoutBorder: string;
	tabsBackground: string;
	tabsBackgroundContrast: string;
}

export interface Colors {
	primary: PrimaryThemePalette;
	secondary: ThemePalette;
	error: Omit<ThemePalette, 'subtle'>;
	link: Pick<ThemePalette, 'color' | 'subtle'> & {
		underline: string;
	};
	chartTheme: string[];
}

export interface Typography {
	fontFamily: string;
	headingFont: string;
	baseFontSize: number;
	baseLineHeight: number;
	normalFontWeight: number;
	boldFontWeight: number;
	maxCharacterWidth: string;
	baseLetterSpacing: number;
}

export interface BreakPoint {
	maxWidth: number;
	heroAspectRatio: { w: number; h: number };
}

export interface BreakPoints {
	mobile: BreakPoint;
	tablet: BreakPoint;
	desktop: BreakPoint;
	largeDesktop: BreakPoint;
}

export interface Sizes {
	maxContentWidth: number;
	largeImage: number;
	mediumImage: number;
	smallImage: number;
	contentPaddingSides: string;
	contentPaddingTop: string;
	contentPaddingBottom: string;
}
export interface Widths {
	oneByTwelve: number;
	twoByTwelve: number;
	threeByTwelve: number;
	fourByTwelve: number;
	fiveByTwelve: number;
	sixByTwelve: number;
	sevenByTwelve: number;
	eightByTwelve: number;
	nineByTwelve: number;
	tenByTwelve: number;
	elevelByTwelve: number;
}

export interface ScreenSizes {
	desktop: {
		height: number;
		maxWidth: number;
	};
	smallScren: {
		height: number;
		maxWidth: number;
	};
	mobile: {
		height: number;
		maxWidth: number;
	};
}
export interface DeviceScale {
	oneX: number;
	onePointFiveX: number;
	twoX: number;
	threeX: number;
}

export default interface Theme {
	baseSpacing: number;
	colors: Colors;
	typography: Typography;
	breakpoints: BreakPoints;
	sizes: Sizes;
	widths: Widths;
	screensizes: ScreenSizes;
}

export type ThemeProps = { theme: Theme };
