/* eslint-disable react/jsx-props-no-spreading */
import { NextDataHooksProvider } from 'next-data-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalStyles';
import Theme from '../styles/theme';
import { InitState } from '../utils/helperFunctions';

function App({ Component, pageProps }: AppProps) {
	const { children, ...rest } = pageProps;

	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<NextDataHooksProvider {...rest}>
				<RecoilRoot initializeState={InitState}>
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
