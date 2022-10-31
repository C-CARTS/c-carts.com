/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { allOptionsSelector, fiscalYearState, selectedOptionSelector } from '../../state/archiveState';
import { ThemeProps } from '../../types/theme';
import { getYear } from '../../utils/dateTime';
import ArchiveDisplay from './archiveDisplay';

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

export default function Archive() {
	const selectedOption = useRecoilValue(selectedOptionSelector);

	const [fiscalYear, setFiscalYear] = useRecoilState(fiscalYearState);
	const allOptions = useRecoilValue(allOptionsSelector);

	const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const val = event.currentTarget.value;
			if (val !== 'Select an option') {
				setFiscalYear(val);
			}
		},
		[setFiscalYear]
	);

	return (
		<SelectorWrap>
			<Label htmlFor="financeData" id="combolabel">
				Select Fiscal year
			</Label>
			<Selector
				aria-describedby="archive-message"
				role="combobox"
				aria-autocomplete="list"
				aria-controls="years"
				aria-expanded={selectedOption}
				aria-activedescendant={fiscalYear}
				name="financeData"
				id="financeData"
				aria-labelledby="combolabel financeData"
				defaultValue="default"
				onChange={onChange}
			>
				{allOptions.map((dat: string, index) => (
					<option key={dat} value={getYear(allOptions[index])}>
						{getYear(allOptions[index])}
					</option>
				))}
			</Selector>
			<div id="years">
				<ArchiveDisplay />
			</div>
		</SelectorWrap>
	);
}
