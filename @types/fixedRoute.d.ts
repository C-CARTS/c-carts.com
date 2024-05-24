type FixedRoute = {
	_type: "fixedRoute";
	image: {
		_type: "image";
		asset: {
			_ref: string;
			_type: "reference";
		};
	};
	pdf: {
		_type: "file";
		asset: {
			_ref: string;
			_type: "reference";
		};
	};
	table: {
		_type: "code";
		code: string;
	};
};

export default FixedRoute;
