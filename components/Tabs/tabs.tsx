/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';
import useScheduleData from '../../data-hooks/useSchedule';
import SubTab from './subTab';

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

	const route = '/riding/maps-and-schedule/';

	const isTabOne = tab === 'N' || tab == null;
	const isTabTwo = tab === 'S';
	const isTabThree = tab === 'ED';
	const isTabFour = tab === 'RC';
	const isTabFive = tab === 'RS';
	const data = useScheduleData();
	const { code, url, pdfUrl } = data;

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
				{isTabOne && <SubTab code={code[0]} url={url[0]} pdfUrl={pdfUrl[0]} tabActive={tab} />}
				{isTabTwo && <SubTab code={code[1]} url={url[1]} pdfUrl={pdfUrl[1]} tabActive={tab} />}
				{isTabThree && <SubTab code={code[2]} url={url[2]} pdfUrl={pdfUrl[2]} tabActive={tab} />}
				{isTabFour && <SubTab code={code[3]} url={url[3]} pdfUrl={pdfUrl[3]} tabActive={tab} />}
				{isTabFive && <SubTab code={code[4]} url={url[4]} pdfUrl={pdfUrl[4]} tabActive={tab} />}
			</TabBody>
		</TabContainer>
	);
}

export default withRouter(Tabs);
