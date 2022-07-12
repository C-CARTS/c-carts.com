import { KeyboardEventHandler, MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { tabIndexState } from '../../state/tabState';
import { ThemeProps } from '../../types/theme';

interface Props extends Pick<HTMLButtonElement, 'id'> {
	subAttribute: boolean;
	currentId: string | null;
	onClick: MouseEventHandler<HTMLButtonElement>;
	onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
	children: ReactNode;
	ariaControls: string;
	index: number;
}

const IndividualTab = styled.button`
	padding: 0.25rem 0px;
	text-transform: capitalize;
	background: none;
	border: none;
	color: #000000;
	width: 30%;
	cursor: pointer;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;

	&:focus,
	&:active,
	&:focus-visible {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: #fff;
		color: #000;
	}
	@media (max-width: 580px) {
		width: ${({ theme }: ThemeProps) => theme.widths.sixByTwelve}%;
	}
`;

const DefaultTab = styled(IndividualTab)`
	&:first-child {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: #fff;
		color: #000;
	}
`;

export default function TabButton({ index, subAttribute, onKeyDown, id, currentId, onClick, children, ariaControls }: Props) {
	const ButtonElement = subAttribute ? DefaultTab : IndividualTab;

	const button = useRef<HTMLButtonElement | null>(null);

	const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);

	useEffect(() => {
		if (tabIndex === index && button.current) {
			button.current.focus();
			setTabIndex(null);
		}
	}, [tabIndex, index, setTabIndex]);

	return (
		<ButtonElement
			ref={button}
			className="tabs-btn"
			onKeyDown={onKeyDown}
			role="tab"
			aria-controls={ariaControls}
			aria-selected={currentId === id}
			id={id}
			onClick={onClick}
		>
			{children}
		</ButtonElement>
	);
}
