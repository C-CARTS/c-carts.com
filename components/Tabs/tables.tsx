import { Maps } from '@c-carts/cms';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

/* eslint-disable react/no-danger */

const TableMobileWrap = styled.div`
	width: 100%;
	max-width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
`;

const TableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: flex-start;
	justify-content: center;
	margin-top: 1rem;

	.westbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}
	.eastbound table {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}

	#directW {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}
	#directE table > th > td {
		width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	}

	#rantoulW {
		width: ${({ theme }: ThemeProps) => theme.widths.fourByTwelve}%;
	}

	@media (max-width: 988px) {
		#rantoulW {
			width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
		}
	}

	#rantoulE {
		width: ${({ theme }: ThemeProps) => theme.widths.sixByTwelve}%;
	}

	@media (max-width: 898px) {
		#rantoulW,
		#rantoulE,
		#directW,
		#directE {
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
		background-color: #f2f2f2;
	}
	tr:hover {
		background-color: #ddd;
	}
	table > thead > tr > th {
		font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.0512rem);
	}

	caption {
		font-weight: 600;
	}

	@media (max-width: 580px) {
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
	@media (max-width: 900px) {
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
	}

	@media (max-width: 820px) {
		#directW {
			width: ${({ theme }: ThemeProps) => theme.widths.elevelByTwelve}%;
		}
		#directE table {
			width: ${({ theme }: ThemeProps) => theme.widths.elevelByTwelve}%;
		}
	}
`;

const InnerContainer = styled(TableContainer)`
	column-width: 10rem;
`;

interface Prop {
	code: Maps['content'];
}

export default function Tables({ code }: Prop) {
	return (
		<TableMobileWrap>
			<TableContainer aria-labelledby="code" tabIndex={0}>
				<InnerContainer dangerouslySetInnerHTML={{ __html: code }} />
			</TableContainer>
		</TableMobileWrap>
	);
}
/// TO-DO Fix issue with layout of table for reduced Service
