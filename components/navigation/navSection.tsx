/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MainNavItem } from '../../data-hooks/useMainNav';
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
		<>
			<button type="button" onClick={buttonClick} ref={buttonRef}>
				{title}
			</button>
			{isOpen && (
				<ul>
					{subPages.map((sp, i) => (
						<SubPage key={sp._id} page={sp} parentSlug={slug} last={i === subPages.length - 1} />
					))}
				</ul>
			)}
		</>
	);
};

export default NavSection;
