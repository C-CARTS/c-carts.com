/* eslint-disable react/jsx-props-no-spreading */
import { NextDataHooksProvider } from 'next-data-hooks';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
	const { children, ...rest } = pageProps;

	return (
		<NextDataHooksProvider {...rest}>
			<Component {...rest}>{children}</Component>
		</NextDataHooksProvider>
	);
}
export default App;
