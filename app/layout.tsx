import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'C-CARTS',
	description: 'Champaign-County Rural Area Transportation System',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main>
					{children}
				</main>
			</body>
		</html>
	);
}
