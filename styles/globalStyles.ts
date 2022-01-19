import { createGlobalStyle } from 'styled-components';
import { ThemeProps } from '../types/theme';

export default createGlobalStyle`
* {
	box-sizing: border-box;
	margin: 0;
}

html {
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;
	scroll-behavior: smooth;
}

body{
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
	line-height: ${({ theme }: ThemeProps) => theme.typography.baseLineHeight};
	font-weight: ${({ theme }: ThemeProps) => theme.typography.baseLineHeight};
	font-style: normal;
}

.content-wrap {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};

	> * {
		width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
		margin-left: auto;
		margin-right: auto;
	}
}

a {
	text-underline-offset: 0.15em;
}

.sr {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
}

p,
blockquote,
li {
	max-width: 75ch;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;
}

p,
blockquote,
ul,
ol,
dl {
	margin: 0 0 1.5em 0;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.normalFontWeight};;
}

ul,
ol,
dl {
	padding-left: 1.5em;
}

blockquote {
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
	text-indent: -1.2em;

	&:before,
	&:after {
		font-weight: bold;
		font-size: 1.5em;
		line-height: 0;
	}

	&:before {
		content: '❝';
		padding-right: 0.2em;
	}
	&::after {
		content: '❞';
		padding-left: 0.2em;
	}
}

li {
	margin: 0;
	+ li {
		margin-top: 0.25em;
	}
}

em,
i {
	font-style: italic;
}

strong,
b {
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
li {
	line-height: 1.5;
	max-width: 75ch;
}

h1, h2, h3, h4,h5, h6 {
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
}

h1 {
	font-size: 2em;
	line-height: 1.5;
	margin-bottom: 0.75em;
}

h2 {
	font-size: 1.5em;
	line-height: 1;
	margin-bottom: 1em;
}

h3 {
	font-size: 1em;
	line-height: 1.5;
}
`;
