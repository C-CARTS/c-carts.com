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
		}
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
	}
};

export default Theme;
