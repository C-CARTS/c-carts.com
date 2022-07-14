import type ThemeType from '../types/theme';

const Theme: ThemeType = {
	colors: {
		primary: {
			color: '#fc4445',
			subtle: '#FDD9D9',
			contrastColor: '#0a0000',
			background: '#ffffff',
			text: '#0a0000',
			layoutBorder: '#cccccc'
		},
		secondary: {
			color: '#3feee6',
			subtle: '#DFF2F1',
			contrastColor: '#000000'
		},
		error: {
			color: '#fc4445',
			contrastColor: '#000000'
		},
		link: {
			color: '#3D6E6B',
			subtle: '#DFF2F1',
			underline: '#3feee6'
		},
		chartTheme: ['#9a3800', '#585c00', '#295e70', '#006800', '#0b50c3', '#9b00aa', '#b4002c']
	},
	typography: {
		baseFontSize: 20,
		baseLineHeight: 1.6,
		fontFamily: 'system-ui, sans-serif',
		headingFont: 'Roboto',
		normalFontWeight: 400,
		boldFontWeight: 700,
		maxCharacterWidth: '80ch',
		baseLetterSpacing: 1.25
	},
	baseSpacing: 1,
	breakpoints: {
		mobile: {
			maxWidth: 768,
			heroAspectRatio: { w: 3, h: 4 }
		},
		tablet: {
			maxWidth: 1000,
			heroAspectRatio: { w: 1, h: 1 }
		},
		desktop: {
			maxWidth: 1921,
			heroAspectRatio: { w: 8, h: 3 }
		},
		largeDesktop: {
			maxWidth: 2000,
			heroAspectRatio: { w: 7, h: 2 }
		}
	},
	sizes: {
		maxContentWidth: 1200,
		largeImage: 880,
		mediumImage: 450,
		smallImage: 300,
		contentPaddingSides: 'clamp(1rem, 5vw, 3rem)',
		contentPaddingTop: 'clamp(1rem, 3vh, 2rem)',
		contentPaddingBottom: 'clamp(2rem, 5vh, 5rem)'
	},
	widths: {
		oneByTwelve: 8.33,
		twoByTwelve: 16.67,
		threeByTwelve: 25,
		fourByTwelve: 33,
		fiveByTwelve: 41.67,
		sixByTwelve: 50,
		sevenByTwelve: 58.33,
		eightByTwelve: 66.66,
		nineByTwelve: 75,
		tenByTwelve: 83.33,
		elevelByTwelve: 91.66
	}
};

export default Theme;

export const mediaQueryMaxWidths = {
	card: 820,
	genericpage: 700,
	newscontainerTwoCol: 900,
	newscontainerOneCol: 720,
	performance: 1100,
	subtab: 580,
	tablesDirect: 820,
	tablesRantoulWest: 988,
	tablesLg: 1200,
	tablesSm: 580
};
