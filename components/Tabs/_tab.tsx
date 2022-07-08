/* eslint-disable jsx-a11y/anchor-is-valid */

import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { activeLabelSelector } from '../../state/tabState';

interface Props {
	label: string;
	children: ReactNode;
}

function Tab({ label, children }: Props) {
	const activeLabel = useRecoilValue(activeLabelSelector);
	return <div id="tabLabel">{activeLabel === label && children}</div>;
}

export default Tab;
