/* eslint-disable react/jsx-props-no-spreading */
import { NextDataHooksProvider } from 'next-data-hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
	const { children, ...rest } = pageProps;

	return (
		<NextDataHooksProvider {...rest}>
			<RecoilRoot>
				<Head>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...rest}>{children}</Component>
			</RecoilRoot>
		</NextDataHooksProvider>
	);
}
export default App;
