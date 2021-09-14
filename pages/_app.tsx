/* eslint-disable react/jsx-props-no-spreading */
import { NextDataHooksProvider } from 'next-data-hooks';
import { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
	const { children, ...rest } = pageProps;

	return (
		<NextDataHooksProvider {...rest}>
			<RecoilRoot>
				<Component {...rest}>{children}</Component>
			</RecoilRoot>
		</NextDataHooksProvider>
	);
}
export default App;
