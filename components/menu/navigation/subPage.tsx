import { Page } from '@c-carts/cms';
import { KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { openIndexState } from './state';

interface Props {
	page: Page;
	last: boolean;
	parentSlug: { _type: 'slug'; current: string } | undefined;
}

export default function SubPage({ parentSlug, last, page: { title, slug } }: Props) {
	const setOpenIndex = useSetRecoilState(openIndexState);

	function onKeyDown({ key, shiftKey }: KeyboardEvent<HTMLAnchorElement>): void {
		// close menu if we tab off the last item.
		if (last && key === 'Tab' && !shiftKey) {
			setOpenIndex(null);
		}
	}

	if (slug && parentSlug) {
		const { current: parentSlugVal } = parentSlug;
		const { current: slugVal } = slug;
		return (
			<a href={`/${parentSlugVal}/${slugVal}`} onKeyDown={onKeyDown}>
				<span>{title}</span>
			</a>
		);
	}
	return null;
}
