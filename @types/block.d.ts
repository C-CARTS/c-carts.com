type BlockContent = {
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

export default BlockContent;
