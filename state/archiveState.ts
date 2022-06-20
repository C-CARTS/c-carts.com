import { FinancialData } from '@c-carts/cms';
import { atom, selector } from 'recoil';
import { getYear } from '../utils/dateTime';
import getPdfUrl from '../utils/getPdfUrl';

function urlSelector(data: FinancialData['fiscalData']) {
	const urls = [];
	if (data !== undefined) {
		for (let i = 0; i < data.length; i++) {
			const ref = data[i].asset._ref;
			const url = getPdfUrl(ref);
			urls.push(url);
		}
	}
	return urls;
}

export const selectedOptionState = atom<boolean>({
	key: 'selectedOptionState',
	default: false
});

export const fiscalDataState = atom<FinancialData[]>({
	key: 'fiscalDataState',
	default: []
});

export const fiscalYearState = atom<string>({
	key: 'setFiscalYear',
	default: ''
});

export const fiscalDataSelector = selector<Array<Object | string>>({
	key: 'fiscalDataSelector',
	get: ({ get }) => {
		const year = get(fiscalYearState);
		const fiscalData: FinancialData[] = get(fiscalDataState);
		const data = fiscalData.find((val) => getYear(val.fiscalYear) === year);
		const checkDataFlag = data !== undefined;
		if (checkDataFlag) {
			const val = { start: data.dateRange[0].startDate, end: data.dateRange[0].endDate };
			const assert = urlSelector(data.fiscalData);
			return [val, assert];
		}
		return ['Data is undefined'];
	}
});
