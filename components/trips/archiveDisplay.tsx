/* eslint-disable @typescript-eslint/dot-notation */

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fiscalDataSelector, fiscalYearState } from '../../state/archiveState';
import { ThemeProps } from '../../types/theme';
import { formatDate } from '../../utils/dateTime';

const DatesContainer = styled.span`
	font-weight: 400;
	padding: 0px calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.2);
`;

const Message = styled.div`
	font-size: 0.9em;
	font-style: italic;
`;

export default function ArchiveDisplay() {
	const fiscalYear = useRecoilValue(fiscalYearState);
	const fiscalData = useRecoilValue(fiscalDataSelector);

	if (!fiscalData) {
		return <Message id="archive-message">Select a year to view archived fiscal reports.</Message>;
	}

	const { dates, urls } = fiscalData;

	return (
		<div>
			<DatesContainer>
				{formatDate(dates.start)} &mdash; {formatDate(dates.end)}
			</DatesContainer>
			<ul aria-label={`list of pdf links to Quarterly Earning for fiscal year ${fiscalYear}`}>
				{urls.map((url: string, index: number) => (
					<li key={url}>
						<a href={url} target="_blank" rel="noreferrer">
							{index}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
