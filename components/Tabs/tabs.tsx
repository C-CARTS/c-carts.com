/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const TabContainer = styled.div`
	width: 100%;
	height: 100%;
	box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
	padding: 0.78rem;
`;

const TabHead = styled.div`
	border-bottom: 1px solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	@media (max-width: 520px) {
		flex-direction: column;
	}
`;

const TabBody = styled.div`
	height: 100%;
	width: 100%;
`;

interface Props {
	selected: Boolean;
}

const Tab = styled.div.attrs(({ selected }: Props) => ({
	select: selected
}))`
	padding: 0.35rem;
`;

function Tabs({ router }: any) {
	const {
		query: { tab }
	} = router;

	const route = '/riding/maps-and-schedule';
	const isTabOne = tab === 'N' || tab == null;
	const isTabTwo = tab === 'S';
	const isTabThree = tab === 'ED';
	const isTabFour = tab === 'RC';
	const isTabFive = tab === 'RS';

	return (
		<TabContainer>
			<TabHead>
				<Tab select={isTabOne}>
					<Link href={{ pathname: `${route}`, query: { tab: 'N' } }}>
						<a>Eagel Express- North</a>
					</Link>
				</Tab>
				<Tab select={isTabTwo}>
					<Link href={{ pathname: `${route}`, query: { tab: 'S' } }}>
						<a>Eagel Express- South</a>
					</Link>
				</Tab>
				<Tab select={isTabTwo}>
					<Link href={{ pathname: `${route}`, query: { tab: 'ED' } }}>
						<a>Eagel Express- South</a>
					</Link>
				</Tab>
				<Tab select={isTabFour}>
					<Link href={{ pathname: `${route}`, query: { tab: 'RC' } }}>
						<a>Rantoul Connector</a>
					</Link>
				</Tab>
				<Tab select={isTabFive}>
					<Link href={{ pathname: `${route}`, query: { tab: 'RS' } }}>
						<a>Reduced Service</a>
					</Link>
				</Tab>
			</TabHead>
			<TabBody>
				{isTabOne && <p>This is tab one content</p>}
				{isTabTwo && <p>This is tab two content</p>}
				{isTabThree && <p>Tab three</p>}
				{isTabFour && <p>Tab four</p>}
				{isTabFive && <p>Tab five</p>}
			</TabBody>
		</TabContainer>
	);
}

export default withRouter(Tabs);
