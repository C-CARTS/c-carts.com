import { Routes } from '@c-carts/cms';
import styled from 'styled-components';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';

/* eslint-disable react/no-danger */

const TableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 1rem;
	margin-bottom: 1rem;

	.columnWd {
		height: 110px;
	}

	.morning,
	.afternoon {
		font-size: 0.9rem;
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
		text-align: center;
	}
	.westbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}
	.eastbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}

	table + table {
		border-left: 4px solid ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		margin-left: -2px;
	}

	#directW,
	#directE {
		width: 100%;
	}

	#directE table > th > td {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}

	@media (max-width: ${mediaQueryMaxWidths.tablesDirect}px) {
		#directW {
			width: 100%;
		}
		#directE table {
			width: 100%;
		}
	}

	#rantoulW {
		width: ${({ theme }: ThemeProps) => theme.widths.fourByTwelve}%;
	}

	@media (max-width: ${mediaQueryMaxWidths.tablesRantoulWest}px) {
		#rantoulW {
			width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
		}
	}

	#rantoulE {
		width: ${({ theme }: ThemeProps) => theme.widths.sixByTwelve}%;
	}

	@media (max-width: ${mediaQueryMaxWidths.tablesLg}px) {
		width: 100%;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		.westbound table {
			width: 100%;
		}
		.eastbound table {
			width: 100%;
		}

		#rantoulW,
		#rantoulE {
			width: 100%;
		}
	}

	thead {
		font-weight: bold;
		border-bottom: none;
	}

	table tr td {
		empty-cells: show;
	}

	table > tr,
	table > th {
		border: 1px solid ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}cc;
		padding: 8px;
	}
	tr:nth-child(even) {
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}44;
	}
	tbody tr:hover {
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}cc;
	}
	table > thead > tr > th:not(.letter) {
		font-size: 0.75rem;
		line-height: 1.25;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		min-width: 5.5rem;
		height: 2.875rem;
	}

	caption {
		font-weight: 600;
		width: auto;
		overflow: none;
		position: relative;
		left: 0px;
		padding: 1rem 0 0.5rem;
		height: calc(25px + 1.5rem);
	}

	@media (max-width: ${mediaQueryMaxWidths.tablesSm}px) {
		min-width: fit-content;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.letter {
		font-size: 1.25rem;
		text-align: center;
	}

	.a {
		background-color: #bf4c66;
	}
	.a,
	.b {
		color: #fff;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.b {
		background-color: #03c;
	}
	.c {
		color: #fff;
		background-color: #365ca9;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.d {
		background-color: #00abee;
	}
	.d,
	.e {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #000;
	}
	.e {
		background-color: #fff100;
	}
	.f {
		background-color: #f8cade;
	}
	.f,
	.g {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #000;
	}
	.g {
		background-color: #f89e2a;
	}
	.h,
	.i {
		color: #fff;
		background-color: #815622;
		-webkit-text-fill-color: #fff;
	}
	.h,
	.i,
	.j {
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
	}
	.j {
		color: #000;
		background-color: #7c822b;
		-webkit-text-fill-color: #000;
	}
	.k {
		color: #fff;
		background-color: #831618;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.l {
		background-color: #b2d235;
	}
	.l,
	.m {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #000;
	}
	.m {
		background-color: #fade9b;
	}
	.n {
		background-color: #eb0e17;
	}
	.n,
	.o {
		color: #fff;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.o {
		background-color: #571a58;
	}
	.p {
		color: #fff;
		background-color: #2b3087;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.q {
		background-color: #ee4032;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
	}
	.q,
	.r {
		color: #000;
		-webkit-text-stroke-width: 0.0325rem;
		-webkit-text-fill-color: #000;
	}
	.r {
		background-color: #ea0088;

		-webkit-text-stroke-color: #000000;
	}
	.s {
		color: #fff;
		background-color: #00688f;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.t {
		background-color: #b2d235;
		-webkit-text-stroke-color: #fff;
	}
	.t,
	.u {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-fill-color: #000;
	}
	.u {
		background-color: #fbcde1;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
	}
	.v {
		background-color: #f48d7d;
	}
	.v,
	.w {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #000;
	}
	.w {
		background-color: #60a2cb;
	}
	.x {
		color: #fff;
		background-color: #008063;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #fff;
	}
	.y {
		background-color: #a9a4d0;
	}
	.y,
	.z {
		color: #000;
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-stroke-color: hsla(0, 0%, 100%, 0);
		-webkit-text-fill-color: #000;
	}
	.z {
		background-color: #c3ce5c;
	}
`;

const InnerContainer = styled(TableContainer)`
	//column-width: 10rem;
`;

interface Prop {
	code: Routes['content'];
}

export default function Tables({ code }: Prop) {
	return (
		<TableContainer id="tablesPanel" aria-labelledby="content" tabIndex={0} role="tabpanel">
			<InnerContainer dangerouslySetInnerHTML={{ __html: code }} />
		</TableContainer>
	);
}
