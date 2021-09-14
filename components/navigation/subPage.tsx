import { FC } from 'react';
import { Page } from '../../sanity/schema';

interface Props {
	page: Page;
}

const SubPage: FC<Props> = ({ page: { title } }: Props) => {
	return <p>{title}</p>;
};
export default SubPage;
