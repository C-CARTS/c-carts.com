import { Page } from '@c-carts/cms';
import { KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { openIndexState } from './state';

/* This is a React component that takes in a `page` and `parentSlug` as props. */
interface Props {
	page: Page;
	last: boolean;
	parentSlug: { _type: 'slug'; current: string } | undefined;
}

/**
 * The SubPage component is a React component that renders a link to a sub page.
 * @param {Props}  - ParentSlug is the slug of the parent page.
 */
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
			<a aria-current="page" href={`/${parentSlugVal}/${slugVal}`} onKeyDown={onKeyDown}>
				<span>{title}</span>
			</a>
		);
	}
	return null;
}
