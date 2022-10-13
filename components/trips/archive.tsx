/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FinancialData } from '@c-carts/cms';
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fiscalDataSelector, fiscalDataState, fiscalYearState, selectedOptionState } from '../../state/archiveState';
import { ThemeProps } from '../../types/theme';
import { formatDate, getYear } from '../../utils/dateTime';

interface Prop {
	data: FinancialData[];
}

const SelectorWrap = styled.div`
	grid-area: selector;
`;

const Label = styled.label`
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	font-size: 1.1rem;
	display: block;
	margin: 0 0 0.25rem 0;
`;

const Selector = styled.select`
	display: block;
	width: 100%;
	max-width: 400px;
	padding: 0.25rem 0.5rem;
	font-size: 1.1rem;
`;

const DatesContainer = styled.span`
	font-weight: 400;
	padding: 0px calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.2);
`;

const Message = styled.div`
	font-size: 0.9em;
	font-style: italic;
`;

export default function Archive({ data }: Prop) {
	const [selectedOption, setCurrentOption] = useRecoilState(selectedOptionState);

	const setFiscalData = useSetRecoilState(fiscalDataState);
	const setFiscalYear = useSetRecoilState(fiscalYearState);
	const fiscalYear = useRecoilValue(fiscalYearState);
	const selectedYearData = useRecoilValue(fiscalDataSelector);

	const dates = selectedYearData.slice(0, 1);
	const urls = selectedYearData.slice(1);
	const Quarters = ['Fourth', 'Third', 'First', 'Second'];

	const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const val = event.currentTarget.value;
			if (val !== 'Select an option') {
				setFiscalYear(val);
				setCurrentOption(val !== null && val.length > 0);
			}
		},
		[setCurrentOption, setFiscalYear]
	);

	useMemo(() => {
		if (data !== undefined) {
			setFiscalData(data);
		}
	}, [setFiscalData, data]);

	const allOptions = data.flatMap((dat: FinancialData) => dat.fiscalYear);
	allOptions.push('Select an Option');
	allOptions.reverse();

	return (
		<SelectorWrap>
			<Label htmlFor="financeData" id="combolabel">
				Select Fiscal year
			</Label>
			<Selector
				aria-describedby="archive-message"
				role="combobox"
				aria-autocomplete="list"
				aria-controls={selectedYearData[0]}
				aria-expanded={selectedOption}
				aria-activedescendant={selectedYearData[0].start}
				name="financeData"
				id="financeData"
				aria-labelledby="combolabel financeData"
				defaultValue="default"
				onChange={onChange}
			>
				{data.map((dat: FinancialData, index) => (
					<option key={dat.slug.current} value={getYear(allOptions[index])}>
						{getYear(allOptions[index])}
					</option>
				))}
			</Selector>
			<div>
				{selectedOption ? (
					<div>
						<DatesContainer>
							{formatDate(dates[0].start)} {formatDate(dates[0].end)}
						</DatesContainer>
						<ul aria-label={`list of pdf links to Quarterly Earning for fiscal year ${fiscalYear}`}>
							{urls[0].map((url: string, index: number) => (
								<li key={url}>
									<a href={url} target="_blank" rel="noreferrer">
										{index < 4 ? Quarters[index] : 'Additional File'}
									</a>
								</li>
							))}
						</ul>
					</div>
				) : (
					<Message id="archive-message">Select a year to view archived fiscal reports.</Message>
				)}
			</div>
		</SelectorWrap>
	);
}
