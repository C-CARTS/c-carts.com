import ImageWithAlt from "./imageWithAlt";

export type BlockText = {
	_type: "block";
	style: string;
	_key: string;
	markDefs: unknown[];
	children: {
		_key: string;
		_type: string;
		text: string;
		marks: string[];
	}[];
};

export type Table = {
	_type: "table";
	_key: string;
	rows: {
		_key: string;
		_type: "tableRow";
		cells: string[];
	}[];
};

type BlockContent = BlockText | ImageWithAlt | Table;

export default BlockContent;
