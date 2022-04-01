import dayjs from 'dayjs';

export default function getDate(date: string) {
	const format = dayjs(date).format('YY-MM-DD');
	return format;
}
