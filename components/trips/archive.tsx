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

const Label = styled.label`
	font-weight: 600;
	font-size: 1.1rem;
	background-image: linear-gradient(
		to right,
		${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}35,
		${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}39
	);
	padding: 0px calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.2);
`;

const Selector = styled.select`
	background: none;
	border: none;
	font-size: 1.1rem;
	margin-left: 10px;
	background-image: linear-gradient(
		to right,
		${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}45,
		${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}49
	);
`;

const DatesContainer = styled.span`
	font-weight: 400;
	padding: 0px calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.2);
`;

const Message = styled.div`
	padding: 0px calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.2);
	font-weight: 600;
`;

export default function Archive({ data }: Prop) {
	const [selectedOption, setCurrentOption] = useRecoilState(selectedOptionState);

	const setFiscalData = useSetRecoilState(fiscalDataState);
	const setFiscalYear = useSetRecoilState(fiscalYearState);
	const fiscalYear = useRecoilValue(fiscalYearState);
	const selectedYearData = useRecoilValue(fiscalDataSelector);

	const dates = selectedYearData.slice(0, 1);
	const urls = selectedYearData.slice(1);
	const Quarters = ['First', 'Second', 'Third', 'Fourth'];

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
		<div>
			<Label htmlFor="financeData" id="combolabel">
				Select Fiscal year
			</Label>
			<Selector
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
						<ul aria-label={`list of pdf links to Quartely Earning for fiscal year ${fiscalYear}`}>
							{urls[0].map((url: string, index: number) => (
								<li key={url}>
									<a href={url} target="_blank" rel="noreferrer">
										{Quarters[index]} Quarter
									</a>
								</li>
							))}
						</ul>
					</div>
				) : (
					<Message>Select Year to display Fiscal Reports</Message>
				)}
			</div>
		</div>
	);
}
