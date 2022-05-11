import styled from 'styled-components';

/* eslint-disable react/no-danger */

const TableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: flex-start;
	justify-content: center;

	.westbound,
	.eastbound {
		height: 100%;
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
	th {
		font-size: 1rem;
	}

	@media (max-width: 580px) {
		flex-direction: column;
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
		-webkit-text-stroke-width: 0.0625rem;
		-webkit-text-fill-color: #000;
		border: 0.125rem solid #fff;
	}
	.r {
		background-color: #ea0088;
		-webkit-text-stroke-color: #fff;
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

interface Prop {
	code: any;
}

export default function Tables({ code }: Prop) {
	return <TableContainer dangerouslySetInnerHTML={{ __html: code }} />;
}
