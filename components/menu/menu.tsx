/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import { FC } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import styles from '../../styles/menu.module.scss';
import Logo from './logo';
import MainNav from './navigation/mainNav';

interface Props {
	title: string;
	logo: SanityImageSource | undefined;
	nav: MainNavItem[];
}

const Menu: FC<Props> = ({ title, nav, logo }: Props) => (
	<header className={styles.header}>
		<div className={styles.logo}>
			<Link href="/">
				<a>
					<Logo logo={logo} />
					<span className="sr">{title}</span>
				</a>
			</Link>
		</div>
		<div className={styles.nav}>
			<MainNav nav={nav} />
		</div>
	</header>
);

export default Menu;
