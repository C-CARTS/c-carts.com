import type ThemeType from '../types/theme';

const Theme: ThemeType = {
	colors: {
		primary: {
			color: '#0d19a3',
			subtle: '#e7e8ec',
			contrastColor: '#ffffff',
			background: '#ffffff',
			text: '#000000',
			layoutBorder: '#cccccc'
		},
		secondary: {
			color: '#15db95',
			subtle: '#c2eadc',
			contrastColor: '#000000'
		},
		error: {
			color: '#f57390',
			subtle: '#efdde1',
			contrastColor: '#030e12'
		}
	},
	typography: {
		baseFontSize: 20,
		baseLineHeight: 1.6,
		fontFamily: 'system-ui, sans-serif',
		normalFontWeight: 400,
		boldFontWeight: 700
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
	}
};

export default Theme;
