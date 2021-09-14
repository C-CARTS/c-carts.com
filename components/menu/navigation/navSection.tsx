/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MainNavItem } from '../../../data-hooks/useMainNav';
import styles from '../../../styles/nav-section.module.scss';
import { focusIndexState, isOpenSelector, openIndexState } from './state';
import SubPage from './subPage';

interface Props {
	index: number;
	item: MainNavItem;
}

const NavSection: FC<Props> = ({ item: { title, subPages, slug }, index }: Props) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const setOpenIndex = useSetRecoilState(openIndexState);
	const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);

	const isOpen = useRecoilValue(isOpenSelector(index));

	useEffect(() => {
		if (focusIndex === index && buttonRef.current) {
			buttonRef.current.focus();
			setFocusIndex(null);
		}
	}, [focusIndex, setFocusIndex, index]);

	function buttonClick(): void {
		if (isOpen) {
			setOpenIndex(null);
		} else {
			setOpenIndex(index);
		}
	}

	return (
		<div className={styles.sectionWrap}>
			<button type="button" onClick={buttonClick} ref={buttonRef} className={`${styles.navButton} ${isOpen ? styles.open : styles.closed}`}>
				<MdArrowDropDown />
				{title}
			</button>
			{isOpen && (
				<ul>
					{subPages.map((sp, i) => (
						<li key={sp._id}>
							<SubPage page={sp} parentSlug={slug} last={i === subPages.length - 1} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default NavSection;
