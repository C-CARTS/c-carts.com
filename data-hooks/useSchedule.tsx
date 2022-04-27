import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const useScheduleData = createDataHook('scheduleData', async () => {
	const query = "*[_type=='maps']{_id,'code':content[].code,'url':images[].asset->url,'pdfUrl':routePdfs[].asset->url}";
	const urlResult = await sanityClient.query(query);

	const data = {
		code: urlResult[0].code,
		pdfUrl: urlResult[0].pdfUrl,
		url: urlResult[0].url
	};
	return data;
});

export default useScheduleData;
