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
	justify-content: center;
	margin-top: 1rem;
	margin-bottom: 1rem;

	.columnWd {
		height: 110px;
	}

	.westbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}
	.eastbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
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
	}

	table tr td {
		empty-cells: show;
	}

	table > tr,
	table > th {
		border: 1px solid #ddd;
		padding: 8px;
	}
	tr:nth-child(even) {
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}75;
	}
	tr:hover {
		background-color: #ddd;
	}
	table > thead > tr > th {
		font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.0512rem);
	}

	caption {
		font-weight: 600;
		height: 25px;
		width: auto;
		overflow: none;
		position: relative;
		left: 0px;
	}

	@media (max-width: ${mediaQueryMaxWidths.tablesSm}px) {
		min-width: fit-content;
		flex-direction: column;
		flex-wrap: wrap;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
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
		border: 0.125rem solid #fff;
	}
	.z {
		background-color: #c3ce5c;
	}
`;

const InnerContainer = styled(TableContainer)`
	column-width: 10rem;
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
