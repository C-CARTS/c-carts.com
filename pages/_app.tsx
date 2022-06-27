/* eslint-disable react/jsx-props-no-spreading */
import { NextDataHooksProvider } from 'next-data-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import GlobalStyles from '../styles/globalStyles';
import Theme from '../styles/theme';

const Spinner = styled.div`
	margin: 0 auto;

	height: 100%;
	width: 100%;
	display: flex;
	padding-top: 20rem;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	.animate {
		width: 4rem;
		height: 4rem;
		animation: rotate 1s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		10% {
			transform: rotate(60deg);
		}
		30% {
			transform: rotate(180deg);
		}
		70% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

function App({ Component, pageProps }: AppProps) {
	//const [display, setDisplay] = useState(false);
	const { children, ...rest } = pageProps;
	// useEffect(() => {
	// 	setDisplay(true);
	// }, []);

	// if (!display || typeof window === undefined) {
	// 	return (
	// 		<Spinner className="spinner">
	// 			<AiOutlineLoading3Quarters className="animate" />
	// 		</Spinner>
	// 	);
	// }

	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<NextDataHooksProvider {...rest}>
				<RecoilRoot>
					<Head>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Component {...rest}>{children}</Component>
				</RecoilRoot>
			</NextDataHooksProvider>
		</ThemeProvider>
	);
}
export default App;
