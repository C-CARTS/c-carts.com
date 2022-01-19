export interface ThemePalette {
	color: string;
	subtle: string;
	contrastColor: string;
}

export interface PrimaryThemePalette extends ThemePalette {
	background: string;
	text: string;
	layoutBorder: string;
}

export interface Colors {
	primary: PrimaryThemePalette;
	secondary: ThemePalette;
	error: Omit<ThemePalette, 'subtle'>;
}

export interface Typography {
	fontFamily: string;
	baseFontSize: number;
	baseLineHeight: number;
	normalFontWeight: number;
	boldFontWeight: number;
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

export default interface Theme {
	baseSpacing: number;
	colors: Colors;
	typography: Typography;
	breakpoints: BreakPoints;
	sizes: Sizes;
}

export type ThemeProps = { theme: Theme };
