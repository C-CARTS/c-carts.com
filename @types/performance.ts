import { SanityDocument } from "next-sanity";

type Performance = SanityDocument & {
	_type: "performance";
	year: number;
	quarter: number;
	file: {
		_type: "file";
		asset: {
			_ref: string;
			_type: "reference";
		};
	};
};

export default Performance;
