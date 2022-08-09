import { KeyboardEventHandler, MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { focusTabState } from '../../state/subTabState';
import { mediaQueryMaxWidths } from '../../styles/theme';
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

const ActiveButton = styled.button`
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.subtle};
	border: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.0419}rem;
	width: ${({ theme }: ThemeProps) => theme.widths.twoByTwelve}%;
	margin-right: 0.6rem;

	padding: 5px;
	&:last-child {
		border-right: none;
	}

	&:hover {
		border-bottom: 0.18rem solid ${({ theme }: ThemeProps) => theme.colors.link.color};
		color: #000000;
	}

	&:focus,
	&:active,
	&:focus-visible {
		border-bottom: 0.2rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}

	@media (max-width: ${mediaQueryMaxWidths.subtab}px) {
		width: 100%;
		margin-bottom: 0.65rem;
	}
`;

const FirstButton = styled(ActiveButton)`
	&:first-child {
		border-bottom: 0.2rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}
`;

export default function SubTabButton({ index, subAttribute, onKeyDown, id, currentId, onClick, children, ariaControls }: Props) {
	const ButtonElement = subAttribute ? FirstButton : ActiveButton;

	const button = useRef<HTMLButtonElement | null>(null);

	const [focusTab, setFocusTab] = useRecoilState(focusTabState);

	useEffect(() => {
		if (focusTab === index && button.current) {
			button.current.focus();
			setFocusTab(null);
		}
	}, [focusTab, index, setFocusTab]);

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
