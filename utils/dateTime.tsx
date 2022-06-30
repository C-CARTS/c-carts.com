import dayjs from 'dayjs';

export default function getDate(date: string) {
	const format = dayjs(date).format('MMMM D,YYYY');
	return format;
}

export function getYear(date: string) {
	const format = dayjs(date).format('YYYY');
	return format;
}

export function formatDate(date: string) {
	const format = dayjs(date).format('MMM-YYYY');
	return format;
}