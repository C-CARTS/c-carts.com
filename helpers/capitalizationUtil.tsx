const ConvertToCapital = (label: string) => {
	const value = label.toString();
	const mutate: string = value.replace('-', '  ');
	const mutateTwo: string = mutate.replace('-', '  ');
	const mutated: string = mutateTwo.toLowerCase();

	return mutated;
};

export default ConvertToCapital;
