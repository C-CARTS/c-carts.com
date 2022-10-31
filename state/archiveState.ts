import { FinancialData } from '@c-carts/cms';
import { atom, selector } from 'recoil';
import { getYear } from '../utils/dateTime';
import getPdfUrl from '../utils/getPdfUrl';

function urlSelector(data: FinancialData['fiscalData']) {
	const urls = [];
	if (data !== undefined) {
		for (let i = 0; i < data.length; i++) {
			const keys = data[i];
			const url = getPdfUrl(keys);
			urls.push(url);
		}
	}
	return urls;
}

export const fiscalDataState = atom<FinancialData[]>({
	key: 'fiscalDataState',
	default: []
});

export const fiscalYearState = atom<string>({
	key: 'setFiscalYear',
	default: ''
});

export const selectedOptionSelector = selector<boolean>({
	key: 'selectedOptionSelector',
	get: ({ get }) => {
		const val = get(fiscalYearState);
		return val !== null && val.length > 0;
	}
});

interface FiscalData {
	dates: {
		start: string;
		end: string;
	};
	urls: string[];
}

export const fiscalDataSelector = selector<FiscalData | null>({
	key: 'fiscalDataSelector',
	get: ({ get }) => {
		const year = get(fiscalYearState);
		const fiscalData: FinancialData[] = get(fiscalDataState);
		const data = fiscalData.find((val) => getYear(val.fiscalYear) === year);
		const checkDataFlag = data !== undefined;
		if (checkDataFlag) {
			const dates = { start: data.dateRange[0].startDate ?? 'Unknown', end: data.dateRange[0].endDate ?? 'Unknown' };
			const urls = urlSelector(data.fiscalData);
			return { dates, urls };
		}
		return null;
	}
});

export const allOptionsSelector = selector<string[]>({
	key: 'allOptionsSelector',
	get: ({ get }) => {
		const data = get(fiscalDataState);
		const allOptions = data.flatMap((dat: FinancialData) => dat.fiscalYear);
		allOptions.push('Select an Option');
		allOptions.reverse();
		return allOptions;
	}
});
