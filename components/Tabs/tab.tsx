/* eslint-disable jsx-a11y/anchor-is-valid */

import { useRecoilValue } from 'recoil';
import { activeLabelSelector } from '../../state/tabState';

function Tab(props: any) {
	const activeLabel = useRecoilValue(activeLabelSelector);
	const { label, children } = props;
	return <div id="tabLabel">{activeLabel === label && children}</div>;
}

export default Tab;
